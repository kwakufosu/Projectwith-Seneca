
# Simple Notes Application

The goal of this project is to show how a microservices app can be constructed with Seneca and deployed with Docker. It is intended for those who want to learn more about Seneca.js. This application allows users to make notes, and the application uses the sendgrid email API to send an email to the hardcoded email address.



## Design
## Installation
To install this project, simply clone it and run the command below:
'npm install'
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`: This is needed in the notes service

`SENDGRID_API_KEY`: This is needed in the email service


## Documentation

#### Overview
Seneca.js is a microservices development toolkit. Seneca provides the tools required to create microservice applications in a straightforward and orderly manner. Docker files are given in case you want to tweak and deploy the application. The current version of the app was built with Docker in mind. To run it locally, remove the 'hostname' from both the email and note services' index.ts files.  To avoid any complexity, the author thought it wise to use the default network docker created for the application. If you run the application with docker and receive gateway timeout errors, please use the 'docker network' commands to locate the right IP addresses for the services. After you have discovered them, replace the 'hostname' IPs in the 'index.ts' files.

#### How It Works
Only the Integration service port is exposed to the outside world. The ports of both the email and notes services can only be reached by the integration service.
For instance when a user wants to create a note, the integration service is responsible for calling the required service and providing the appropriate response.

#### Defined Routes 
`localhost:3000/api/create`: To create a note
Eg. {
    "note":"God is good"
}

`localhost:3000/api/fetch_note`: To fetch all notes

 


## Acknowledgements

 - [Seneca.js](https://senecajs.org/)
 - [Docker](https://www.docker.com/)


