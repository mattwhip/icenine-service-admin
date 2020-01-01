package grifts

import (
	dao "github.com/mattwhip/icenine-database/admin"
	"github.com/mattwhip/icenine-service-admin/models"
	"github.com/markbates/grift/grift"
	"golang.org/x/crypto/bcrypt"
)

var _ = grift.Namespace("db", func() {

	grift.Desc("seed", "Seeds a database")
	grift.Add("seed", func(c *grift.Context) error {
		// Create default admin user
		u := "admin"
		p := "password"
		ph, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		return models.DB.Create(&dao.AdminUser{
			Username:     u,
			PasswordHash: string(ph),
		})
	})

})
