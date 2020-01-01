# Google Cloud config
GC_PROJECT=indian-game-system
GC_REGION=us-central
GC_ZONE=us-central1-a

# Service config
SERVICE_NAME=admin
SERVICE_VERS=latest

# Protobuf generation config
BASE_SRC_PROTO_DIR=protodefs
BASE_DEST_PROTO_DIR=assets/src/generated
REQUIRED_PROTO_DIRS="util" "services/user_data" "services/game/teen_patti" "services/bot" "services/daily_bonus" "services/matchmaking" "services/matchmaking_system" "services/user_accounts" "services/admin" "services/kafka_websocket"

###########
# Docker
###########

# Build the service
build:
	docker build -t gcr.io/${GC_PROJECT}/${SERVICE_NAME}:${SERVICE_VERS} -f Dockerfile . --build-arg GC_PROJECT=${GC_PROJECT}

# Push the service image
push:
	docker push gcr.io/${GC_PROJECT}/${SERVICE_NAME}:${SERVICE_VERS}

###########
# Generate
###########
# Can be called for local "buffalo dev" style work, but separate protobuf generation is configured
# in ./Dockerfile
generate:
	# Clean admin generated files
	rm -rf assets/src/generated/*
	mkdir -p $(BASE_DEST_PROTO_DIR)
	# Generate admin JS protobuf files
	for protoDir in ${REQUIRED_PROTO_DIRS} ; do \
        mkdir -p $(BASE_DEST_PROTO_DIR)/$$protoDir ; \
		npx pbjs -t static-module -w commonjs -o ${BASE_DEST_PROTO_DIR}/$$protoDir/compiled.js ${BASE_SRC_PROTO_DIR}/$$protoDir/*.proto ; \
    done
	
###########
# Migrate
###########
migrate:
	echo "Migrating ${SERVICE_NAME} db"
	buffalo db migrate

###########
# Seed
###########
seed:
	echo "Seeding ${SERVICE_NAME} db"
	buffalo t db:seed
