package actions

import (
	"log"
	"regexp"

	"github.com/gobuffalo/buffalo/render"
	packr "github.com/gobuffalo/packr/v2"
)

var r *render.Engine

var assetsBox = packr.NewBox("../public")
var reactIndexPath = "/assets/index.js"

func init() {
	r = render.New(render.Options{
		// HTML layout to be used for all HTML requests:
		HTMLLayout: "react_application.html",

		// Box containing all of the templates:
		TemplatesBox: packr.NewBox("../templates"),
		AssetsBox:    assetsBox,

		// Add template helpers here:
		Helpers: render.Helpers{
			// uncomment for non-Bootstrap form helpers:
			// "form":     plush.FormHelper,
			// "form_for": plush.FormForHelper,
		},
	})

	// Find name of the hashed react index js so it can later be rendered in using plush templates with other data
	assets := assetsBox.List()
	matchFound := false
	for _, asset := range assets {
		match, err := regexp.MatchString("/index.*.js", asset)
		if err != nil {
			log.Fatalf("error encountered finding react index in packr assets box: %v\n", err)
		}
		if match {
			if matchFound {
				log.Printf("WARNING: encountered duplicate react index js in packr assets box %v\n", asset)
			} else {
				matchFound = true
				reactIndexPath = asset
			}
		}
	}
	if matchFound {
		log.Printf("Found react index js in packr assets: %v\n", reactIndexPath)
	} else {
		log.Printf("WARNING: react index js not found in assets box, using default index js path: %v\n", reactIndexPath)
	}
}
