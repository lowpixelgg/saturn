# Saturn 🪐
Saturn is a graceful name for the "mothership" of rocket roleplay, the primitive idea of this system is to accommodate the entire ecosystem of the server. Be it the platform, client or game itself. Saturn is a fast, highly scalable and testable API using Typescript.


## Introduction
Saturn seeks to integrate not only monoliths, but the entire Rocket ecosystem so that the server and platform work together. The main idea of this service is to integrate multiple services such as HTTP, WebSockets and others in the future. We hope that the service will be even more scalable so that we can integrate even more features that help both in server development and in player-to-player gameplay. Currently, Saturn is constantly being updated to be extremely performant in several use cases.


## Pre-requisites
- Node.js => 10
- Postgres
- Docker
- Redis


# Development
Main IDE: [Visual Studio Code](https://code.visualstudio.com) <br>
Engine: [Node](https://nodejs.org)


### Running a dev-server: <br>
> You can start a local server for development without using separate command lines for each service.
```bash
cd saturn
docker compose up -d
yarn && yarn dev
```

### Testing it <br>
> We used the test files as close as possible to native code for easy access. Please keep this in mind before contributing.
```bash
cd saturn
# Not necessary run docker for this
yarn tests
```

### SMTP
> For sending emails to users and customers we use sendinblue in production. However, in a development environment, we strongly recommend that you use the [Mailtrap](https://mailtrap.io)
```env
MAILER_HOST=[SMTP_HOST]
MAILER_PORT=[SMTP_PORT]
MAILER_SECURE=[STMP_IS_SECURE]
MAILER_AUTH_USERNAME=[SMTP_AUTH_USER]
MAILER_AUTH_PASSWORD=[SMTP_AUTH_PASSWORD]
```

### Storage(GCP)
> Again, in production we use GCP-Storage to store image files in .webp unfortunately saturn does not yet have a development env to provide local storage. We hope to change this in the future.
> However, you can create a free trial account at [Google Cloud](https://cloud.google.com) to develop features related to storage, you should get a config file that looks like this for saturn to work stably.
```json
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}
```
Small Note: you will only need this if you are going to work with storage, fixes and features that do not depend on it, it is not necessary to configure this file.
