# icenine-service-admin
Admin service with React Redux based frontend for the IceNine system

This service is part of the IceNine project, a scalable cloud-based multiplayer server. The Admin service is built using Golang with the Buffalo web framework, and a React-based JavaScript frontend is embedded in the application binary. Here are some important pieces in the repository code structure:
- *actions*: HTTP request handlers (e.g. login, get/set IceNine service configuration)
- *assets*: React Redux frontend source
- *protodefs*: Protobuf definitions originally taken from a git submodule in the IceNine project source. The files were copied here to make the example code simpler.

Concepts/technologies used:
- Golang with Buffalo web framework for application creation
	- HTTP request handling
	- Object Relational Mapping for MySQL database access using Buffalo's Pop library
- JavaScript with React Redux for frontend
	- Sagas for management of application side effects
	- Selectors for efficient computation of derived state data 
	- WebSockets for communication with other services in the IceNine system
- Protobuf for all message (de)serialization
