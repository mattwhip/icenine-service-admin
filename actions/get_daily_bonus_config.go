package actions

import (
	"io"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/pop"
	"github.com/golang/protobuf/proto"

	dbModels "bitbucket.org/gopileon/icenine-database/daily_bonus"
	pbAdmin "bitbucket.org/gopileon/icenine-services/generated/services/admin"

	"github.com/pkg/errors"
)

// GetDailyBonusConfigHandler handles an admin get daily bonus config request
func GetDailyBonusConfigHandler(c buffalo.Context) error {
	// Get the pop transaction for each DB from the context
	txDailyBonus := c.Value("tx_db").(*pop.Connection)

	// Get the existing daily bonus config
	conf := &dbModels.DbConfig{}
	if err := txDailyBonus.First(conf); err != nil {
		return c.Error(500, errors.Wrap(err, "failed to load daily bonus config from database"))
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
