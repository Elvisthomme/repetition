# Project Node typescript container
A project generator that facilitates the implementation of an API using Node.js, Express, TypeScript, and Docker.

## Description
This project aims to simplify the creation and implementation of an API using Node.js, Express, TypeScript, and Docker. It provides a pre-configured project structure and tools to accelerate the development and deployment process of your API.

## Features
- Well-organized project structure with a modular architecture.
- Pre-configured setup for Node.js, Express, and TypeScript.
- Docker integration for easy container deployment and management.
- Automated testing tools to ensure code quality.
- Automatically generated Swagger documentation for the API.
- Internationalization management with i18next.
## Installation
### 1. Clone this repository:

```bash
git clone https://github.com/your-username/your-project.git
```

### 2. Navigate to the project directory:

```bash
cd your-project
```

Install the dependencies:

```bash
npm install
```
Configuration
Before running the application, you need to configure certain environment variables. Create a .env file at the root of the project and specify the following variables:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/database-name
JWT_SECRET=your-jwt-secret
```
Make sure to replace the values with the appropriate configurations for your environment.

## Usage
To start the application in development mode, run the following command:

```bash
npm run dev
```
The application will be accessible at http://localhost:3000.

To build a production-ready version of the application, run the following command:

```bash
npm run build
```
This will transpile the JavaScript code into the dist directory.

To start the application in production mode, run the following command:

```bash
npm start
```
## Testing
To run the automated tests, use the following command:

```bash
npm test
```
## Documentation
The API documentation is automatically generated using Swagger. You can access it at http://localhost:3000/api-docs once the server is up and running.

## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:

### 1. Fork the repository.
### 2. Create a branch for your changes: git checkout -b my-branch.
### 3. Make the necessary modifications and commit: git commit -m "Add my changes".
### 4. Push to the branch: git push origin my-branch.
### 5. Open a pull request to submit your changes.

## License
This project is distributed under the MIT License.