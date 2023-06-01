# Peace of Mind

BrainStation Web Development Bootcamp Capstone Project

## Goal

Peace of Mind is an application meant to assist in the day-to-day self-care and mental health of the user by providing an all-in-one solution for journaling and daily gratitude.

## Core Features

- Allows users to login and make journal entries, and keep track of their daily gratitudes.
- Retrieves a random inspirational quote when you log in.

## Initial Setup (Development and Testing)

Once you have cloned this repository to your computer, this application has the following prerequisites:

- MySQL Database, with login credentials
- API Ninja Free API Key [API Ninjas](https://api-ninjas.com/register)

---

1. Copy /server/.env.example to /server/.env and populate with MySQL credentials.

2. To generate a JWT token, copy/paste the following command into your terminal and add the string to the JWT_SECRET in the /server/.env file

> node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

3. Sign up for a free API key at [API Ninjas](https://api-ninjas.com/register) and paste it between the quotes in API_KEY='' in your /server/env file.

4. Install backend packages

> npm i

5. Run inital database migration script (Creates tables and necessary columns)

> npm run migrate

6. Run the following command in your terminal to start the backend server.

> npm run dev

7. In another terminal, cd into the 'client' directory and install the frontend packages.

> npm i

8. Run the client development server.

> npm run dev

9. (Optional) To create a production build of the client files, run:

> npm run build

## Deployment to Production (Optional)

### Docker

This application was built to be platform agnostic, and utilizes docker containers for both the frontend and backend.

#### Build Server Image

1. The Server file can be built directly, run the following command from the parent directory:

> docker build -t server server

2. Push the image and deploy to your favourite container service (AWS, Google Cloud...etc). Use the same environment variables as the /server/.env file. Make a note of the public URL.

#### Build Client Image

The client image is a multi-stage image. It first creates a build copy of the client files and then deploys the static files via nginx.

1. Open /client/src/App.jsx and replace the value of 'axios.defaults.baseURL' with the server image public URL.

2. From the parent directory, run the following command to create an image:

> docker build -t client client

3. Push to your container registry of choice and deploy.

### Node.js

1. Copy server/.env.example to server.env and populate credentials.
2. In the /server/ directory, run `yarn run node-deploy`

## Tags

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
