# WebGIS Backend API
Backend REST API for WebGIS applications providing feature-linked PostgreSQL/PostGIS data.

## Getting Started (Docker)

1. Copy `db/config.example.js` to `db/config.js` and fill in your database credentials:
   ```sh
   cp db/config.example.js db/config.js
   # Edit config.js as needed
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

- **Trees**
  - `GET /{db}/tree`  
    Returns all tree from the selected database.
  - `GET /{db}/tree/:id`  
    Returns a single tree by ID from the selected database.
  - `GET /{db}/tree/:id/control`  
    Returns all controls for a tree.

- **Road Sections**
  - `GET /{db}/road-section`  
    Returns all road sections from the selected database.
  - `GET /{db}/road-section/:id`  
    Returns a single road section by ID from the selected database.
  - `GET /{db}/road-section/:id/control`  
    Returns all controls for a road section.
  - `GET /{db}/road-section/:id/excavation`  
    Returns all excavations for a road section.


## Sorting Results

Many endpoints (e.g. `/tree`, `/tree/:id/control`, `/road-section`, `/road-section/:id/control`, `/road-section/:id/excavation`) support a `sortby` query parameter to sort the results by one or more columns.

- Syntax: `?sortby=+column1,-column2`
  - Use `+` (or no prefix) for ascending, `-` for descending order.
  - Only whitelisted columns are allowed for sorting.

### Example Requests

- `GET /lohmar/road-section`  
  Returns all road sections from the `lohmar` database.
- `GET /lohmar/road-section/6803`  
  Returns the road section with ID 6803 from the `lohmar` database.
- `GET /lohmar/road-section/6803/control`  
  Returns all controls for road section 6803 from the `lohmar` database.
- `GET /lohmar/road-section/10692/excavation`  
  Returns all excavations for road section 10692 from the `lohmar` database.
  - `GET /lohmar/road-section?sortby=-id`
  Returns all road sections from the `lohmar` database, absteigend nach `id` sortiert.
- `GET /lohmar/road-section/6803/control?sortby=-naechstekontrolle`
  Returns all controls for road section 6803, absteigend nach `naechstekontrolle` sortiert.

## Notes
- The API connects to multiple PostgreSQL databases as configured in your `db/config.js` file.
- Make sure your local PostgreSQL is accessible from Docker (use `host.docker.internal` as DB_HOST on Windows).
