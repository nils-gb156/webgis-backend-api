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

3. The API will be available at [http://localhost:4430/webgis-backend-api](http://localhost:4430/webgis-backend-api)

## IIS Deployment

- Kopiere das Projektverzeichnis auf den Webserver nach `C:\inetpub\wwwroot\webgis-backend-api\`
- (Nur beim ersten Mal) Setze Vollzugriff für `IIS_IUSRS` auf den Ordner `C:\inetpub\wwwroot\webgis-backend-api\`
- Passe in der `web.config` den Node.js-Pfad an, z.B. zu `C:\Program Files\nodejs\node.exe`
- **Für iisnode-Betrieb:**
  - Installiere das [URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite) und [iisnode](https://github.com/Azure/iisnode/releases) auf dem Server.
  - Kontrolliere, dass `nodeProcessCommandLine` in der `web.config` auf den Node.js-Pfad des Zielservers zeigt.
  - Setze im IIS Application Pool die .NET CLR-Version auf **No Managed Code**.
  - Aktiviere die **anonyme Authentifizierung** für die Website.
  - Erlaube den gewünschten Port (z.B. 4430) in der Windows-Firewall **und** ggf. in der Anbieter-Firewall/Sicherheitsgruppe.
  - Lege im IIS ein HTTPS-Binding mit Zertifikat und gewünschtem Port an (z.B. 4430, Hostname optional).

## API Endpoints

- **Health Check**
  - `GET /health`  
    Returns the connection status for all configured databases.

- **Bäume**
  - `GET /{db}/baum`  
    Gibt alle Bäume aus der gewählten Datenbank zurück.
  - `GET /{db}/baum/:gid`  
    Gibt einen einzelnen Baum anhand der GID zurück.
  - `GET /{db}/baum/:gid/kontrolle`  
    Gibt alle Kontrollen zu einem Baum zurück.

- **Straßenabschnitte**
  - `GET /{db}/strassenabschnitt`  
    Gibt alle Straßenabschnitte aus der gewählten Datenbank zurück.
  - `GET /{db}/strassenabschnitt/:gid`  
    Gibt einen einzelnen Straßenabschnitt anhand der GID zurück.
  - `GET /{db}/strassenabschnitt/:gid/kontrolle`  
    Gibt alle Kontrollen zu einem Straßenabschnitt zurück.
  - `GET /{db}/strassenabschnitt/:gid/aufbruch`  
    Gibt alle Aufbrüche zu einem Straßenabschnitt zurück.


## Sorting Results

Viele Endpunkte (z.B. `/baum`, `/baum/:gid/kontrolle`, `/strassenabschnitt`, `/strassenabschnitt/:gid/kontrolle`, `/strassenabschnitt/:gid/aufbruch`) unterstützen den Query-Parameter `sortby`, um die Ergebnisse nach einer oder mehreren Spalten zu sortieren.

- Syntax: `?sortby=+spalte1,-spalte2`
  - `+` (oder kein Präfix) sortiert aufsteigend, `-` absteigend.
  - Es können nur freigegebene (whitelisted) Spalten zum Sortieren verwendet werden.

### Example Requests

- `GET /webgis-backend-api/lohmar/strassenabschnitt`  
  Gibt alle Straßenabschnitte aus der Datenbank `lohmar` zurück.
- `GET /webgis-backend-api/lohmar/strassenabschnitt/3120`  
  Gibt den Straßenabschnitt mit GID 3120 aus der Datenbank `lohmar` zurück.
- `GET /webgis-backend-api/lohmar/strassenabschnitt/3120/kontrolle`  
  Gibt alle Kontrollen für Straßenabschnitt 3120 aus der Datenbank `lohmar` zurück.
- `GET /webgis-backend-api/lohmar/strassenabschnitt/3120/aufbruch`  
  Gibt alle Aufbrüche für Straßenabschnitt 3120 aus der Datenbank `lohmar` zurück.
- `GET /webgis-backend-api/lohmar/strassenabschnitt?sortby=-gid`
  Gibt alle Straßenabschnitte aus der Datenbank `lohmar` zurück, absteigend nach `gid` sortiert.
- `GET /webgis-backend-api/lohmar/strassenabschnitt/3120/kontrolle?sortby=-naechstekontrolle`
  Gibt alle Kontrollen für Straßenabschnitt 3120, absteigend nach `naechstekontrolle` sortiert.

## Notes
- The API connects to multiple PostgreSQL databases as configured in your `db/config.js` file.
- Make sure your local PostgreSQL is accessible from Docker (use `host.docker.internal` as DB_HOST on Windows).



