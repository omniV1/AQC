# Lunara Postpartum Support Platform

Lunara is a comprehensive platform designed to provide support for individuals during the postpartum period. It features a robust backend API and a modern frontend interface.

## Tech Stack

-   **Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA, Maven
-   **Frontend:** React (or similar, built with Vite), TypeScript, Tailwind CSS
-   **Database:** PostgreSQL
-   **Containerization:** Docker, Docker Compose
-   **Code Quality:** SonarQube
-   **API Documentation:** Swagger UI (Springdoc OpenAPI)
-   **Database Migrations:** Flyway
-   **Authentication:** JWT

## Project Structure

-   `backend/`: Contains the Spring Boot backend application.
-   `Lunara/`: Contains the frontend application (React/Vite).
-   `docker-compose.yml`: Defines and configures the services for the development environment (database, backend, frontend, SonarQube).

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Node.js and npm/yarn/pnpm (for frontend development)
-   Java JDK 17 (for backend development)
-   Maven (for backend development)

### Running the Full Application (Docker)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up environment variables:**
    Rename `docker-compose.yml.example` to `docker-compose.yml` if you haven't already.
    You might need to configure secrets like `SONAR_TOKEN` and `JWT_SECRET` in your `docker-compose.yml` or environment.

3.  **Build and run the containers:**
    ```bash
    docker-compose up --build -d
    ```
    The `-d` flag runs the containers in detached mode.

4.  **Access the services:**
    *   **Backend API:** `http://localhost:8080`
    *   **Frontend Application:** `http://localhost:5173` (Note: The frontend service is currently commented out in `docker-compose.yml`. You'll need to uncomment it or run it manually.)
    *   **PostgreSQL Database:** Accessible on port `5432` (primarily for backend connection)
    *   **SonarQube:** `http://localhost:9000`
    *   **Swagger API Documentation:** `http://localhost:8080/swagger-ui.html` (once the backend is running)

## Backend Details (`backend/`)

The backend is a Spring Boot application providing the API for Lunara.

### Building and Running Manually

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Build the project:**
    ```bash
    ./mvnw clean install
    ```
3.  **Run the application:**
    ```bash
    ./mvnw spring-boot:run
    ```
    Alternatively, you can run the packaged JAR file from the `target` directory.

### API Documentation

API documentation is available via Swagger UI when the backend application is running:
`http://localhost:8080/swagger-ui.html`

The `ENABLE_SWAGGER_UI` and `ENABLE_API_DOCS` environment variables in `docker-compose.yml` should be set to `true`.

## Frontend Details (`Lunara/`)

The frontend is a modern web application likely built with React, Vite, and TypeScript.

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

## Contributing

Please refer to the contribution guidelines if you wish to contribute to this project (TODO: Create a CONTRIBUTING.md). 