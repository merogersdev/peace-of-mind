# Peace of Mind

![Peace Of Mind Screenshot](https://github.com/merogersdev/peace-of-mind/assets/56097611/536c7e2d-d911-40ae-8096-664de46a80d7)

## Quick Summary

BrainStation Web Development Bootcamp Capstone Project. Utilizes SASS/SCSS, React, JWT Tokens, Vite, Node, Express and a PostgreSQL Database. Demo is deployed to an AWS EC2 instance running Ubuntu Server.

## Goal

Peace of Mind is an application meant to assist in the day-to-day self-care and mental health of the user by providing an all-in-one solution for journaling and daily gratitude.

## Core Features

- Allows users to login and make journal entries, and keep track of their daily gratitudes.
- Retrieves a random inspirational quote when you log in.

## Initial Setup (Development)

Once you have cloned this repository to your computer, this application has the following prerequisites:

- PostgreSQL Database, with login credentials
- API Ninja Free API Key [API Ninjas](https://api-ninjas.com/register)

---

1. Copy /server/.env.example to /server/.env and populate with PostgreSQL credentials.

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

## Tags

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
