package actions

import (
	"io"
	"time"

	dao "github.com/mattwhip/icenine-database/admin"
	pbAdmin "github.com/mattwhip/icenine-services/generated/services/admin"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/gobuffalo/pop"
	"github.com/golang/protobuf/proto"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

// LoginHandler handles an admin login request
func LoginHandler(c buffalo.Context) error {

	// Bind the request to a struct
	request := &pbAdmin.LoginRequest{}
	if err := c.Bind(request); err != nil {
		return c.Error(400, err)
	}

	// Get the pop transaction from the context
	tx := c.Value("tx").(*pop.Connection)

	// Attempt to find the user in the DB
	user := dao.AdminUser{}
	if err := tx.Where("u_name = ?", request.User).First(&user); err != nil {
		return c.Error(500, err)
	}

	// Securely compare hash and password
	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash), []byte(request.Password)); err != nil {
		return c.Error(500, err)
	}

	// Create JSON Web Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(jwtDuration).Unix(),
			Subject:   user.Username,
		})
	signed, err := token.SignedString([]byte(jwtSigningSecret))
	if err != nil {
		return c.Error(500, err)
	}

	// Render successful response
	return c.Render(200, r.Func("application/proto", func(w io.Writer, d render.Data) error {
		pbresp := &pbAdmin.LoginResponse{
			Jwt: signed,
		}
		serializedProto, err := proto.Marshal(pbresp)
		if err != nil {
			return c.Error(500, errors.Wrap(err, "failed to serialize protobuf"))
		}
		_, err = w.Write(serializedProto)
		return err
	}))
}
