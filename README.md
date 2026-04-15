## SMARTINVESTOR LITE

Smart Investor is an AI-powered agent that helps small businesses make informed pricing decisions and business planning. It considers costs, desired margins, and competitor pricing to recommend price for items. It also suggest business actions.Expalin reasoning clearly.

## Demo


## Table of Contents

- [Smart Investor Lite](#smartinvestor-lite)
  - [Demo](#demo)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Setup Instructions](#setup-instructions)
    - [1. Backend](#1-backend)
    - [2. Frontend](#2-frontend)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [Architecture](#architecture)
  - [SDG Alignment](#sdg-alignment)
  - [Limitations](#limitations)
  - [License](#license)

---

## Project structure

```
Root
├── web          # React + Next.js Web UI
├── cmd/         # Entry point for backend service
├── config/      # Env handling & configuration
├── handlers/    # HTTP request handlers (pricing, ping)
├── middleware/  # Rate limiting
├── models/      # Data structures for API
├── services/    # Pricing engine, risk engine, LLM integration
├── go.mod       # Go module definition
├── go.sum       # Go module checksums
└── README.md
```

---

## Web

**Tech Stack:**

* React + Next.js (TypeScript)
* Tailwind CSS for styling

**Structure Highlights:**

* `app/` – main application pages
* `components/` – reusable UI components (form, results, explanation card)
* `hooks/` – React hooks for state management and API calls
* `lib/` – utility libraries
* `public/` – static assets
* `styles/` – global styles

**Features:**

* Input form for unit cost, desired margin, and competitor prices
* Displays recommended price, price range, profit scenarios, and risk
* Shows LLM-generated explanation of recommendations
* Responsive and minimal UI for quick demo

---

# Internal 

**Tech Stack:**

* Go
* REST API endpoints
* OpenRouter LLM integration (`google/gemini-3-flash-preview`)

**Structure Highlights:**

```
cmd/service/main.go          # Entry point for backend service
config/                      # Env handling & configuration
handlers/                    # HTTP request handlers (pricing, ping)
middleware/                  # Rate limiting
models/                      # Data structures for API
services/                    # Pricing engine, risk engine, LLM integration
```

## Setup Instructions

### 1. Backend

1. Navigate to the project root directory:

```bash
cd SmartInvestor-AI
```

2. Create a `.env` file in the root with your OpenRouter API key:

```env
OPENROUTER_API_KEY=<your-api-key>
```

3. Install dependencies and run the service:

```bash
go mod tidy
go run ./cmd/service
```

The internal service will start a REST API server (default port 8080).

---

### 2. Frontend

1. Navigate to the `web` directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

> The frontend will call the backend API for pricing recommendations. Ensure the backend is running.

---

## Environment Variables

**Internal:**

| Variable             | Description                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `OPENROUTER_API_KEY` | API key for OpenRouter LLM access (`google/gemini-3-flash-preview`) |
| `PORT`               | API port (default: `8080`, set by most cloud platforms automatically) |
| `FRONTEND_URL`       | Deployed web app origin for CORS, e.g. `https://your-app.vercel.app` |

**Web:**

| Variable                   | Description |
| -------------------------- | ----------- |
| `NEXT_PUBLIC_API_BASE_URL` | Public base URL of the internal API (example: `https://smartinvestor-api.onrender.com`) |

> Obtain an API key by registering with OpenRouter, then create a key.

---

## Usage

1. Open the frontend in your browser
2. Enter product information:

   * Unit cost
   * Desired margin
   * Competitor min & max prices
3. Click **“Analyze Pricing”**
4. View:

   * Recommended price
   * Price range
   * Profit scenarios
   * Risk assessment
   * LLM explanation of reasoning

---

## Architecture

**Flow:**

```
Frontend Form --> Backend /api/price/recommend
        --> Pricing Engine --> Risk Engine --> LLM Service
        --> Structured Response (JSON) --> Frontend
```

* **Pricing Engine:** Calculates recommended price & profit scenarios
* **Risk Engine:** Scores potential risks based on inputs
* **LLM Service:** Generates human-readable explanation
* **Frontend:** Displays results in a user-friendly UI

---

## SDG Alignment

This project aligns with **SDG 8: Decent Work and Economic Growth** by supporting small businesses to make sustainable, informed pricing decisions.

---

## Limitations

* Assumes accurate input data (costs, competitor prices)
* Does not account for brand perception or marketing factors
* LLM explanation may vary slightly depending on API output
* Rate-limited to prevent excessive token usage

---

## License

This project is open for educational purposes.
Use responsibly and do not rely on this tool for financial/legal advice.

---

## Deployment Quickstart

### 1. Deploy internal API (Render/Railway/Fly)

Build/start command:

```bash
go run ./cmd/service
```

Required env vars:

```env
OPENROUTER_API_KEY=...
PORT=8080
FRONTEND_URL=https://<your-frontend-domain>
```

Health checks (all supported):

* `GET /ping`
* `GET /health`
* `GET /api/ping`
* `GET /api/health`

Pricing endpoints (both supported):

* `POST /price/recommend`
* `POST /api/price/recommend`

### 2. Deploy web app (Vercel/Netlify)

This repo includes a root `netlify.toml` configured for the `web` app.

From `web` (local verification):

```bash
npm install
npm run build
npm run start
```

Required env var:

```env
NEXT_PUBLIC_API_BASE_URL=https://<your-internal-api-domain>
```

### 3. Verify after deploy

1. Open `/` and ensure it renders the pricing form (no homepage 404).
2. Call API health endpoint from browser/Postman.
3. Submit the form and verify pricing response returns 200.
