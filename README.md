# Saturn 🪐
Saturn is a graceful name for the "mothership" of rocket roleplay, the primitive idea of this system is to accommodate the entire ecosystem of the server. Be it the platform, client or game itself. Saturn is a fast, highly scalable and testable API using Typescript.


## Introduction
Saturn seeks to integrate not only monoliths, but the entire Rocket ecosystem so that the server and platform work together. The main idea of this service is to integrate multiple services such as HTTP, WebSockets and others in the future. We hope that the service will be even more scalable so that we can integrate even more features that help both in server development and in player-to-player gameplay. Currently, Saturn is constantly being updated to be extremely performant in several use cases.


## Pre-requisites
- Node.js => 10
- Postgres
- Docker
- Redis


## Development
Main IDE: [Visual Studio Code](https://code.visualstudio.com) <br>
Engine: [Node](https://nodejs.org)


#### Running a dev-server: <br>
> You can start a local server for development without using separate command lines for each service.
```bash
cd saturn
docker compose up -d
yarn && yarn dev
```

#### Testing it <br>
> We used the test files as close as possible to native code for easy access. Please keep this in mind before contributing.
```bash
cd saturn
# Not necessary run docker for this
yarn tests
```

#### SMTP
> For sending emails to users and customers we use sendinblue in production. However, in a development environment, we strongly recommend that you use the [Mailtrap](https://mailtrap.io)
> To send emails to users, we use [Resend](https://resend.com/), you need to create your Api key and configure it.
```env
MAILER_API_KEY=[RESEND_API_KEY]
```

#### Storage(GCP)
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

## Building
We use vitepack for testing and building the project, so building and compiling becomes extremely easy and performant. Perform the steps below to create a mastered version for external Saturn testing
```bash
cd saturn
yarn && yarn build
pm2 start run.sh --name ROCKET_CADBRA1
```
Remember to read the LICENSE before hosting a Saturn for testing.

# Contributing
We appreciate you joining our development team fixing bugs, creating features or improving the ecosystem as a whole. Feel free to compile and create custom forks of the system. But first of all remember that this system is under license for non-commercial use. Also remember to read the CONTRIBUITE.pt.md file or in your native language before creating a PR or ISSUE.



<br><br>
Made with ❤️ by Rocket for Community.
