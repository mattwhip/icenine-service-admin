package actions

import (
	"io"

	udModels "github.com/mattwhip/icenine-database/user_data"
	"github.com/mattwhip/icenine-service-admin/models"
	pbAdmin "github.com/mattwhip/icenine-services/generated/services/admin"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/pop"
	"github.com/golang/protobuf/proto"
	"github.com/pkg/errors"
)

// SetUserDataConfigHandler handles an admin set user data config request
func SetUserDataConfigHandler(c buffalo.Context) error {
	// Bind the request to a struct
	request := &pbAdmin.UserDataConfig{}
	if err := c.Bind(request); err != nil {
		return c.Error(400, errors.Wrap(err, "request binding failed"))
	}

	// Validate config values
	if request.InitialCoins < 1 {
		return c.Error(400, errors.New("Initial coins must be positive"))
	}

	// Initialize user data configuration struct
	conf := &udModels.UdConfig{}

	// Retrieve and commit updated config in a transaction
	if err := models.DBUserData.Transaction(func(txUserData *pop.Connection) error {
		// Get the existing user data config
		if err := txUserData.First(conf); err != nil {
			return c.Error(500, errors.Wrap(err, "failed to load user data config from database"))
		}
		// Update the existing config
		conf.InitialCoins = request.InitialCoins
		conf.InitialRating = request.InitialRating
		conf.InitialRatingDeviation = request.InitialRatingDeviation
		conf.InitialRatingVolatility = request.InitialRatingVolatility
		if err := txUserData.Save(conf); err != nil {
			return c.Error(500, errors.Wrap(err, "failed to save updated user data config to database"))
		}
		return nil
	}); err != nil {
		return c.Error(500, errors.Wrap(err, "error encountered in user data DB transaction"))
	}

	// Render successful response with protobuf payload
	return c.Render(200, r.Func("application/proto", func(w io.Writer, d render.Data) error {
		pbresp := &pbAdmin.UserDataConfig{
			InitialCoins:            conf.InitialCoins,
			InitialRating:           conf.InitialRating,
			InitialRatingDeviation:  conf.InitialRatingDeviation,
			InitialRatingVolatility: conf.InitialRatingVolatility,
		}
		serializedProto, err := proto.Marshal(pbresp)
		if err != nil {
			return c.Error(500, errors.Wrap(err, "failed to serialize protobuf"))
		}
		_, err = w.Write(serializedProto)
		return err
	}))
}
