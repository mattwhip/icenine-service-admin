package main

import (
	"log"

	"github.com/mattwhip/icenine-service-admin/actions"
)

func main() {
	app := actions.App()
	if err := app.Serve(); err != nil {
		log.Fatal(err)
	}
}
