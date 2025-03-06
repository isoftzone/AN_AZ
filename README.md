---

# Project Setup Guide

Welcome to our project! This guide will help you set up and run the different components of our application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- Yarn (optional, if you prefer using Yarn over npm)
- Nodemon (for running the backend with automatic restarts)

## Running the Backend

To start the backend server, follow these steps:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Start the backend server using Nodemon:
   ```bash
   nodemon
   ```

The backend server will start, and Nodemon will automatically restart it whenever changes are detected.

### Database Configuration

The database connectivity settings are located in the `config.js` file within the `backend` folder. Ensure that your database credentials and connection details are correctly configured in this file.

## Running the Admin Panel

To start the admin panel, follow these steps:

1. Navigate to the `admin` directory:
   ```bash
   cd admin
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the admin panel:
   ```bash
   npm run dev
   ```

This command will start the admin panel in development mode.

## Running the Web Application

To start the web application, follow these steps:

1. Navigate to the `web` directory:
   ```bash
   cd web
   ```

2. Install the necessary dependencies using Yarn:
   ```bash
   yarn install
   ```

3. Start the web application:
   ```bash
   yarn start
   ```

This command will start the web application in development mode.

## Additional Notes

- Ensure that all environment variables required for database connectivity and other configurations are correctly set up in your environment.
- If you encounter any issues, please refer to the respective error messages or consult the project's documentation for further assistance.
