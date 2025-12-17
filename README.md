# WebGIS Backend API
Backend REST API for WebGIS applications providing feature-linked PostgreSQL/PostGIS data.

## Getting Started (Docker)

1. Copy `.env.example` to `.env` and fill in your database credentials:
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

2. Build and start the API using Docker Compose:
   ```sh
   docker-compose up -d
   ```

3. The API will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- **Health Check**
  - `GET /health`  
    Returns the connection status for all configured databases.

- **Road Sections**
  - `GET /{db}/road-section`  
    Returns all road sections from the selected database.
  - `GET /{db}/road-section/:id`  
    Returns a single road section by ID from the selected database.
  - `GET /{db}/road-section/:id/control`  
    Returns all controls for a road section.
  - `GET /{db}/road-section/:id/departure`  
    Returns all departures for a road section.

## Example Requests

- `GET /lohmar/road-section`  
  Returns all road sections from the `lohmar` database.
- `GET /lohmar/road-section/1234`  
  Returns the road section with ID 1234 from the `lohmar` database.
- `GET /lohmar/road-section/1234/control`  
  Returns all controls for road section 1234 from the `lohmar` database.
- `GET /lohmar/road-section/1234/departure`  
  Returns all departures for road section 1234 from the `lohmar` database.

## Notes
- The API connects to multiple PostgreSQL databases as configured in your `.env` file.
- Make sure your local PostgreSQL is accessible from Docker (use `host.docker.internal` as DB_HOST on Windows).
