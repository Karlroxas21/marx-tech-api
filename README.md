# Marx Tech API

A personal API for my projects and freelance work, built with Express.js, Docker, and showcasing Domain-Driven Design (DDD) and clean architecture principles.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Contributing](#contributing)
- [Contact](#contact)

## Features
- RESTful API for personal and freelance projects
- Modular, maintainable codebase
- DDD and Clean Architecture patterns
- Email sending and more(soon)

## Tech Stack
- Node.js / Express.js
- Typescript
- Docker
- Nodemailer
- GitHub Registry and Workflows

## Architecture
This project uses Domain-Driven Design and Clean Architecture.  
- **components:** Services, Adapters, Interfaces 
- **controllers:**  Express controllers, and routes
- **infrastructure:** Database, email, external APIs  
- **errors:** Errors utilities
- **middlewares:** Middlewares (json-parser, request-logger, etc.)
- **utilities:** Reusable functions, sync/async wrappers

## Getting Started

### Prerequisites
- Node.js (v20+)
- Docker (optional)

### Installation
```sh
git clone https://github.com/karlroxas21/marx-tech-api.git
cd marx-tech-api
npm install
```

### Running Locally
```sh
npm run start
```

## Usage
- See the API docs or source code for available endpoints.

## Environment Variables
See `.env.example` for required variables.

## Docker
To build and run with Docker:
```sh
docker build -t marx-tech-api .
docker run --env-file .env -p 3000:3000 marx-tech-api
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## Contact
Email: karlm.roxas@gmail.com