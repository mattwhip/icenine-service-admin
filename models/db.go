package models

import (
	"log"

	"github.com/gobuffalo/envy"
	"github.com/gobuffalo/pop"
)

// DB is a connection to the admin database
var DB *pop.Connection

// DBUserAccounts is a connection to the user accounts database
var DBUserAccounts *pop.Connection

// DBUserData is a connection to the user data database
var DBUserData *pop.Connection

// DBDailyBonus is a connection to the daily bonus database
var DBDailyBonus *pop.Connection

// DBBot is a connection to the bot database
var DBBot *pop.Connection

func init() {
	// Admin DB
	var err error
	env := envy.Get("GO_ENV", "development")
	DB, err = pop.Connect(env)
	if err != nil {
		log.Fatal(err)
	}
	// UserAccounts DB
	DBUserAccounts, err = pop.Connect(env + "_useraccounts")
	if err != nil {
		log.Fatal(err)
	}
	// UserAccounts DB
	DBUserData, err = pop.Connect(env + "_userdata")
	if err != nil {
		log.Fatal(err)
	}
	// DailyBonus DB
	DBDailyBonus, err = pop.Connect(env + "_dailybonus")
	if err != nil {
		log.Fatal(err)
	}
	// Bot DB
	DBBot, err = pop.Connect(env + "_bot")
	if err != nil {
		log.Fatal(err)
	}
	// Debug mode
	pop.Debug = env == "development"
}
