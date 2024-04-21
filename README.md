
# JOBS GONJO

A brief instructions so that we can run this project on a local machine.


## Documentation

Explore career opportunities seamlessly with our user-friendly job portal website. Connect employers with skilled professionals, offering a diverse range of job listings. Simplify your job search or talent acquisition process with intuitive features, creating a bridge between talent and opportunities.
## Demo
Live Site:
https://jobs-portal-swx6.vercel.app/
## Features

- Create account as a Recruiter
- Create account as job seeker
- Account also Create and Login with Google And Github as a Job Seeker.
 
## Recruiter Account Features

- Create new type category of job, Also can Get and Delete the category created by himself.
- Add position of the job category, Recruiter Also can Get and Delete, Update the category created by himself.
- Can see own added positions in a separate route and can also see how many people have applied each position.

## Seeker Account Features

- Candidates can apply for any position.
- can't apply more than once for the same position.
- If he wants withdraw application.


## Run Locally

Clone the project

```bash
  git clone https://github.com/MohammadApon11/jobs-portal
```

Go to the client side

```bash
  cd jobs-gonjo-client
```

Install dependencies

```bash
  yarn add or npm install
```

Start Locally

```bash
  yarn start or npm start
```
Go to the server side

```bash
 cd jobs-gonjo-server
```

Install dependencies

```bash
  yarn add or npm install
```
Start Locally

```bash
  yarn start or npm start
```
## If we want to integrate the client and server side together and run the local machine, then we need to change the base url at 9 places on the client side, Otherwise, we can run it on the local machine by just starting the client side, then the API endpoint's request response will be sent directly Come From vercel.

#### This is the main url, https://jobserver-xyvn.onrender.com/ change to http://localhost:5000/

```http
1.   /src/components/AllJobs.jsx in this file 2 places url need change.
```

```http
2.  /src/components/SingleJobs.jsx
```

```http
3.  /src/context/AuthProviders.jsx
```

```http
4.  /src/hooks/useAppliedMyJobs.js
```

```http
5.  /src/hooks/useAxiosSecure.js
```

```http
6.  /src/hooks/useGetUser.js
```

```http
7.  /src/hooks/useSaveUser.js
```

```http
8.  /src/pages/login/Login.jsx
```
## Environment Variables

To run this project, you will need to add the following environment variables to your server side .env file

`DB_USER`

`DB_PASS`

`ACCESS_TOKEN_SECRET`
## Deployment

Client side deploy in vercel that linking in git repository

Server side deploy in also vercel

```bash
  vercel
```
## Used Dependencies

### Client side
- react
- react-dom
- react-router-dom
- react-scripts
- axios
- react-spinners
- sweetalert2
- web-vitals
- react-icons-kit
- react-icons
- react-hot-toast
- react-hook-form
- emotion/react
- emotion/styled
- material-ui/core
- mui/icons-material
- mui/material
- mui/system
- react-spring/web
- testing-library/jest-dom
- testing-library/react
- testing-library/user-event
- firebase
### Server side
- express
- mongodb
- jsonwebtoken
- cors
- dotenv
- morgan
