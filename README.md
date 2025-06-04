# Lunara Postpartum Support Platform

Lunara is a comprehensive platform designed to provide support for individuals during the postpartum period. It features a robust backend API and a modern frontend interface.

## Tech Stack

-   **Backend:** Node.js 18+, Express.js, TypeScript, Mongoose (MongoDB), Passport.js, JWT, Nodemailer
-   **Frontend:** React (or similar, built with Vite), TypeScript, Tailwind CSS
-   **Database:** MongoDB
-   **Containerization:** Docker, Docker Compose
-   **Code Quality:** SonarQube
-   **API Documentation:** Swagger UI (swagger-jsdoc, swagger-ui-express)
-   **Authentication:** JWT, Google OAuth

## Project Structure

-   `backend/`: Contains the Node.js/Express backend application (TypeScript, MongoDB, Passport.js, etc.)
-   `Lunara/`: Contains the frontend application (React/Vite).
-   `docker-compose.yml`: Defines and configures the services for the development environment (database, backend, frontend, SonarQube).

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Node.js and npm/yarn/pnpm (for backend and frontend development)
-   MongoDB (local or via Docker)

### Running the Full Application (Docker)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up environment variables:**
    Rename `docker-compose.yml.example` to `docker-compose.yml` if you haven't already.
    You might need to configure secrets like `JWT_SECRET`, `EMAIL_PASS`, and OAuth credentials in your `.env` files.

3.  **Build and run the containers:**
    ```bash
    docker-compose up --build -d
    ```
    The `-d` flag runs the containers in detached mode.

4.  **Access the services:**
    *   **Backend API:** `http://localhost:5000`
    *   **Frontend Application:** `http://localhost:5173` (Note: The frontend service is currently commented out in `docker-compose.yml`. You'll need to uncomment it or run it manually.)
    *   **MongoDB Database:** Accessible on port `27017` (primarily for backend connection)
    *   **SonarQube:** `http://localhost:9000`
    *   **Swagger API Documentation:** `http://localhost:5000/api-docs` (once the backend is running)

## Backend Details (`backend/`)

The backend is a Node.js/Express application written in TypeScript, providing the API for Lunara.

### Building and Running Manually

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5000` by default.

4.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

### API Documentation

API documentation is available via Swagger UI when the backend application is running:
`http://localhost:5000/api-docs`

## Frontend Details (`Lunara/`)

The frontend is a modern web application built with React, Vite, and TypeScript.

*(Note: The frontend service is commented out in the main `docker-compose.yml`. The instructions below assume you might run it standalone or uncomment it in the Docker setup.)*

### Building and Running Manually

1.  **Navigate to the frontend directory:**
    ```bash
    cd Lunara
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    The application will typically be available at `http://localhost:5173`.

## Code Quality

This project uses SonarQube for static code analysis.
-   Access the SonarQube dashboard at `http://localhost:9000` when running via Docker Compose.
-   Backend SonarQube properties are configured in `backend/sonar-project.properties`.
-   Frontend SonarQube properties are configured in `Lunara/sonar-project.properties`.

## TypeScript & Documentation

-   **Backend is fully converted to TypeScript** for type safety, maintainability, and better developer experience.
-   **Comprehensive documentation**: Each major backend directory (`config`, `middleware`, `models`, `routes`, `services`, `types`, `utils`) now contains a `README.md` and JSDoc comments for all major files and exports.
-   **Swagger/OpenAPI**: All API endpoints are documented and browsable at `/api-docs`.
-   **See `Docs/Guides/TYPESCRIPT_CONVERSION.md`** for a summary of the conversion and documentation improvements.

## Contributing

Please refer to the contribution guidelines if you wish to contribute to this project (TODO: Create a CONTRIBUTING.md). 