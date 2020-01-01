package actions

import (
	"io"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/pop"
	"github.com/golang/protobuf/proto"

	udModels "github.com/mattwhip/icenine-database/user_data"
	pbAdmin "github.com/mattwhip/icenine-services/generated/services/admin"

	"github.com/pkg/errors"
)

// GetUserDataConfigHandler handles an admin get user data config request
func GetUserDataConfigHandler(c buffalo.Context) error {
	// Get the pop transaction for each DB from the context
	txUserData := c.Value("tx_ud").(*pop.Connection)

	// Get the existing user data config
	conf := &udModels.UdConfig{}
	if err := txUserData.First(conf); err != nil {
		return c.Error(500, errors.Wrap(err, "failed to load user data config from database"))
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
