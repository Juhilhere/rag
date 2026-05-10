# RagDocs

RagDocs is a cinematic, AI-powered research assistant that helps you extract insights, summaries, and answers directly from your documents. Think of it as your personal research companion, inspired by NotebookLM. It delivers an immersive, "operating system" style workspace for PDFs and CSVs powered by RAG (Retrieval-Augmented Generation).

## Highlights

- **Immersive Editorial UI**: Built with React Native and NativeWind, featuring a premium light, beige-inspired interface with fluid animations, ambient backgrounds, and a knowledge graph visualization.
- **Document Ingestion (RAG)**: Upload PDF or CSV documents. The system chunks text, generates vector embeddings, and indexes them in Qdrant for fast semantic search.
- **Grounded AI Responses**: Powered by OpenRouter and Langchain, RagDocs answers strictly from your uploaded document context and includes source citations.
- **Conversational Awareness**: Handles greetings naturally while staying focused on research and document exploration.
- **Cross-Platform**: Built with Expo for Web, iOS, and Android from a single codebase.

## Architecture & Tech Stack

### Frontend (React Native / Expo)

- **Framework**: Expo / Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animations**: React Native Reanimated
- **Icons**: Lucide React Native
- **HTTP Client**: Axios

### Backend (Node.js / Express)

- **Framework**: Express.js
- **Vector Database**: Qdrant (`@qdrant/js-client-rest`, `@langchain/qdrant`)
- **LLM & Embeddings**: OpenRouter, OpenAI Embeddings (`@langchain/openai`)
- **Document Parsing**: `pdf-parse`, `csv-parse`
- **Orchestration**: Langchain

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A [Qdrant](https://qdrant.tech/) cluster (cloud or local)
- An [OpenRouter](https://openrouter.ai/) API Key

### Backend Setup

1. Go to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend`:
   ```env
   PORT=5000
   QDRANT_URL=your_qdrant_cluster_url
   QDRANT_API_KEY=your_qdrant_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   MODEL=your_preferred_openrouter_model # e.g., openai/gpt-4o-mini
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend runs on `http://localhost:5000`.

### Frontend Setup

1. Go to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Frontend`:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the Expo development server:
   ```bash
   npm start
   ```
5. Open the app in your browser (press `w`), iOS simulator (press `i`), or Android emulator (press `a`).

## Usage

1. **Upload**: Use the interface to upload a PDF or CSV file. The backend parses, chunks, and indexes the document into Qdrant.
2. **Chat**: Ask questions after upload. RagDocs retrieves relevant chunks and generates grounded answers with citations.
