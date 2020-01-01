package grifts

import (
	"github.com/mattwhip/icenine-service-admin/actions"
	"github.com/gobuffalo/buffalo"
)

func init() {
	buffalo.Grifts(actions.App())
}
