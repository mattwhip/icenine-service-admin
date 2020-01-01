# This is a multi-stage Dockerfile and requires >= Docker 17.05
# https://docs.docker.com/engine/userguide/eng-image/multistage-build/
ARG GC_PROJECT

FROM gcr.io/${GC_PROJECT}/gobuild:latest as builder

# Copy project files into container
ADD . .

# Uncomment for resolution of previously prepped local dependencies with 'go mod vendor'
# COPY vendor/bitbucket.org/gopileon/icenine-database ../icenine-database
# COPY vendor/bitbucket.org/gopileon/icenine-services ../icenine-services

RUN git config --global credential.helper 'store --file ~/gobuffalo/.gitcredentials'

# Reinstall node_modules in container
RUN rm -rf node_modules
RUN npm install

# Clean admin generated files
RUN rm -rf assets/src/generated/*
RUN mkdir -p assets/src/generated

# Generate admin JS protobuf files
RUN for protoDir in util services/user_data services/game/teen_patti services/bot services/daily_bonus services/matchmaking services/matchmaking_system services/user_accounts services/admin services/kafka_websocket ; do \
    mkdir -p assets/src/generated/$protoDir ; \
	npx pbjs -t static-module -w commonjs -o assets/src/generated/$protoDir/compiled.js protodefs/$protoDir/*.proto ; \
done

# Build the app, and statically link all dependencies
RUN buffalo build --ldflags '-extldflags "-static"' -o /bin/app


FROM alpine:3.8

WORKDIR /bin/

COPY --from=builder /bin/app .

# Bind the app to 0.0.0.0 so it can be seen from outside the container
ENV ADDR=0.0.0.0

# Comment out to run the migrations before running the binary:
# CMD /bin/app migrate; /bin/app
CMD exec /bin/app
