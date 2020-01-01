package actions

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo-pop/pop/popmw"
	"github.com/gobuffalo/envy"
	forcessl "github.com/gobuffalo/mw-forcessl"
	paramlogger "github.com/gobuffalo/mw-paramlogger"
	"github.com/gobuffalo/x/sessions"
	"github.com/golang/protobuf/proto"
	"github.com/pkg/errors"
	"github.com/unrolled/secure"

	"github.com/mattwhip/icenine-service-admin/models"
	pbAdmin "github.com/mattwhip/icenine-services/generated/services/admin"
	myMiddleware "github.com/mattwhip/icenine-services/middleware"
)

// ENV is used to help switch settings based on where the
// application is being run. Default is "development".
var ENV = envy.Get("GO_ENV", "development")
var app *buffalo.App

var jwtSigningSecret = os.Getenv("JWT_SIGNING_SECRET")
var jwtDuration = time.Minute * 30

// App is where all routes and middleware for buffalo
// should be defined. This is the nerve center of your
// application.
func App() *buffalo.App {
	if app == nil {
		app = buffalo.New(buffalo.Options{
			Env:          ENV,
			SessionStore: sessions.Null{},
			SessionName:  "_admin_session",
		})
		// Automatically redirect to SSL
		app.Use(forcessl.Middleware(secure.Options{
			SSLRedirect:     ENV == "production",
			SSLProxyHeaders: map[string]string{"X-Forwarded-Proto": "https"},
		}))

		if ENV == "development" {
			app.Use(paramlogger.ParameterLogger)
		}

		// Protect against CSRF attacks. https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
		// app.Use(csrf.New)

		// Serve single page react app at root
		app.GET("/", func(c buffalo.Context) error {
			// Use Plush templates to render the content-hashed index js path into the react index html
			c.Set("reactIndexPath", reactIndexPath)
			return c.Render(200, r.HTML("react_index.html"))
		})
		// Redirect to root if a main page is ever directly retrieved (e.g. on refresh)
		app.GET("/main{rest:[/]*.*}", func(c buffalo.Context) error {
			return c.Redirect(307, "/")
		})

		// The login handler will need to have access to the JWT configuration
		// TODO: Get token duration from database config
		login := app.Group("/login")
		login.Use(popmw.Transaction(models.DB))
		login.POST("/", LoginHandler)

		// Add JWT validation middleware to all admin API handlers
		api := app.Group("/api")
		api.Use(myMiddleware.JWTVerification(jwtSigningSecret))
		api.Use(popmw.Transaction(models.DB))
		api.Use(myMiddleware.MultiPopTransaction(models.DBUserAccounts, "ua"))
		api.Use(myMiddleware.MultiPopTransaction(models.DBUserData, "ud"))
		api.Use(myMiddleware.MultiPopTransaction(models.DBDailyBonus, "db"))
		api.Use(myMiddleware.MultiPopTransaction(models.DBBot, "bot"))

		api.POST("/user/delete", DeleteUserHandler)
		api.GET("/user/status", UserStatusHandler)
		api.GET("/user/session", UserSessionHandler)

		api.POST("/user/search", UserSearchHandler)
		api.POST("/user/get/details", UserDetailsHandler)
		api.POST("/user/set/details", SetUserDetailsHandler)

		api.POST("/summary", SummaryHandler)

		api.POST("/config/get/daily_bonus", GetDailyBonusConfigHandler)
		api.POST("/config/set/daily_bonus", SetDailyBonusConfigHandler)

		api.POST("/config/get/user_accounts", GetUserAccountsConfigHandler)
		api.POST("/config/set/user_accounts", SetUserAccountsConfigHandler)

		api.POST("/config/get/user_data", GetUserDataConfigHandler)
		api.POST("/config/set/user_data", SetUserDataConfigHandler)

		api.POST("/config/get/bot", GetBotConfigHandler)
		api.POST("/config/set/bot", SetBotConfigHandler)

		// Serve files from the public directory
		app.ServeFiles("/", assetsBox)

		// Setup custom error handlers for status codes used by admin
		errorWriteFunc := func(writer http.ResponseWriter, err error) error {
			pbresp := &pbAdmin.ErrorResponse{
				Message: fmt.Sprintf("Server error encountered: %s", err.Error()),
			}
			serializedProto, err := proto.Marshal(pbresp)
			if err != nil {
				return errors.Wrap(err, "failed to serialize protobuf")
			}
			writer.Write(serializedProto)
			return nil
		}
		protoErrorHandler := func(status int, err error, c buffalo.Context) error {
			res := c.Response()
			res.WriteHeader(status)
			if err := errorWriteFunc(res, err); err != nil {
				return errors.Wrap(err, "failed to write error response")
			}
			return nil
		}
		app.ErrorHandlers[400] = protoErrorHandler
		app.ErrorHandlers[404] = protoErrorHandler
		app.ErrorHandlers[500] = protoErrorHandler
	}

	return app
}
