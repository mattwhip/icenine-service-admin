package actions

import (
	"encoding/json"
	"io"

	dbModels "github.com/mattwhip/icenine-database/daily_bonus"
	"github.com/mattwhip/icenine-service-admin/models"
	dailyBonus "github.com/mattwhip/icenine-services/daily_bonus"
	pbAdmin "github.com/mattwhip/icenine-services/generated/services/admin"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/pop"
	"github.com/golang/protobuf/proto"
	"github.com/pkg/errors"
)

// SetDailyBonusConfigHandler handles an admin set daily bonus config request
func SetDailyBonusConfigHandler(c buffalo.Context) error {
	// Bind the request to a struct
	request := &pbAdmin.DailyBonusConfig{}
	if err := c.Bind(request); err != nil {
		return c.Error(400, errors.Wrap(err, "request binding failed"))
	}

	// Validate timing values
	if request.ResetSeconds < 1 {
		return c.Error(400, errors.New("reset seconds must be positive"))
	}
	if request.StreakBreakSeconds < 1 {
		return c.Error(400, errors.New("streak break seconds must be positive"))
	}
	if request.StreakBreakSeconds < request.ResetSeconds {
		return c.Error(400, errors.New("streak break seconds must be greater than or equal to reset seconds"))
	}

	// Validate wheels JSON
	dailyBonusWheels := &dailyBonus.Wheels{}
	if err := json.Unmarshal([]byte(request.WheelsJSON), dailyBonusWheels); err != nil {
		return c.Error(400, errors.Wrap(err, "failed to unmarshal wheels JSON"))
	}
	if err := dailyBonusWheels.Validate(); err != nil {
		return c.Error(400, errors.Wrap(err, "failed to validate wheels JSON"))
	}

	// Marshal JSON again to clean up string
	sanitizedWheelsJSON, err := json.Marshal(dailyBonusWheels)
	if err != nil {
		return c.Error(500, errors.Wrap(err, "failed to re-marshal validated JSON wheels"))
	}

	// Initialize daily bonus configuration struct
	conf := &dbModels.DbConfig{}

	// Retrieve and commit updated config in a transaction
	if err := models.DBDailyBonus.Transaction(func(txDailyBonus *pop.Connection) error {
		// Get the existing daily bonus config
		if err := txDailyBonus.First(conf); err != nil {
			return c.Error(500, errors.Wrap(err, "failed to load daily bonus config from database"))
		}

		// Update the existing config
		conf.ResetSeconds = request.ResetSeconds
		conf.StreakBreakSeconds = request.StreakBreakSeconds
		conf.WheelsJSON = string(sanitizedWheelsJSON)
		if err := txDailyBonus.Save(conf); err != nil {
			return c.Error(500, errors.Wrap(err, "failed to save updated daily bonus config to database"))
		}
		return nil
	}); err != nil {
		return c.Error(500, errors.Wrap(err, "error encountered in daily bonus DB transaction"))
	}

	// Render successful response with protobuf payload
	return c.Render(200, r.Func("application/proto", func(w io.Writer, d render.Data) error {
		pbresp := &pbAdmin.DailyBonusConfig{
			ResetSeconds:       conf.ResetSeconds,
			StreakBreakSeconds: conf.StreakBreakSeconds,
			WheelsJSON:         conf.WheelsJSON,
		}
		serializedProto, err := proto.Marshal(pbresp)
		if err != nil {
			return c.Error(500, errors.Wrap(err, "failed to serialize protobuf"))
		}
		_, err = w.Write(serializedProto)
		return err
	}))
}
