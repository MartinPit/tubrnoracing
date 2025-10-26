# Project: BRNORACING Headless CMS & Nuxt Frontend

This repository contains a modern, decoupled web application.

* **Backend (CMS):** Directus (Headless CMS) running in Docker with a PostgreSQL database.
* **Frontend (Presentation):** Nuxt 3 (Vue.js framework) for a fast, modern UI.

---

## 🚀 Getting Started (Run Locally)

### Prerequisites

Ensure you have the following installed and running:

1.  **Docker Desktop** (must be running before starting services).
2.  **Node.js** (v22.12.0+ recommended).
3.  **npm** (comes with Node.js).

### Step 1: Clone & Setup Secrets

1.  Clone the repository and navigate to the root directory (`/web`):

    ```bash
    git clone git@gitlab.com:tubrno-racing/web.git
    cd web
    ```

2.  **Create/Fill Secrets:** You must securely obtain the required secret strings (DB_PASSWORD, AUTH_KEY, AUTH_SECRET) from a shared vault or teammate.

    ```bash
    Setup Backend Secrets
    cd directus
    cp example.env .env
    # Now, manually paste the actual secrets into the new .env file.

    # Create .env file in /app folder (directus url)
    ```

### Step 2: Launch the Backend (Directus & Database)

Navigate back to the `directus/` directory and use Docker Compose:

```bash
cd ../directus
docker-compose up -d
```

Wait: Allow 30-60 seconds for the backend to initialize.
Access CMS: The Directus Admin Panel is available at: http://localhost:8055

### Step 3: Launch the Frontend (Nuxt)
Navigate to the app/ directory, install dependencies, and start the development server:
```bash
cd ../app
npm i
npm run dev
```
**Access Frontend**: The Nuxt application is running at: http://localhost:3000

## 🛠️ Configuration Details

**Directus Docker Compose** (directus/docker-compose.yml)
* This configuration uses variables defined in your private .env file.

**Nuxt Configuration** (app/nuxt.config.ts)
* This ensures the frontend can read the Directus URL.