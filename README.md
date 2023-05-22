# IOT-Manager
This is a Node application.
This project allows the communication with the RPI-software by transferring and receiving data frame to/from RPI-Software.
This application communicate directly with the contreaul-api to store logs and get actions...

## Prerequisites

- Node.js version 14 or higher
- NPM or Yarn

## Resources
- [API documentation](https://github.com/Contreau-L/contreauL-back/blob/main/api-doc.yml)
- [Node JS](https://nodejs.org/en/docs)

## Installation

1. Clone the Git repository:
```bash
git clone https://github.com/Contreau-L/IOT-Manager.git
```

2. Environment variables:

Create a .env file and fill it with the following variables and their values :
- SOCKET_PORT
- API_URL
- API_PORT

3. Install dependencies:
```bash
npm install
```

4. Launch the application in development mode
```bash
npm run dev
```

5. Launch the application
```bash
npm run start
```

6. Build the application container
```bash
make up
```


