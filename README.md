# RagDocs

RagDocs is a Retrieval-Augmented Generation (RAG) platform for document-centric querying, semantic retrieval, and contextual AI inference. It provides a unified workspace for ingesting, indexing, and interacting with structured and unstructured datasets, including PDFs and CSV files.

The system combines vector search, embedding pipelines, and LLM-based reasoning to generate context-grounded responses with citation tracing.

## Core Features

- **Document-Centric RAG Pipeline**  
  Supports ingestion of PDF and CSV documents. Uploaded files are parsed, segmented into semantic chunks, embedded using transformer-based embedding models, and indexed in Qdrant for low-latency vector retrieval.

- **Context-Grounded Response Generation**  
  Integrates OpenRouter and LangChain to generate responses constrained to retrieved document context. Outputs include source attribution for traceability and hallucination reduction.

- **Semantic Retrieval Layer**  
  Uses dense vector similarity search through Qdrant to retrieve high-relevance context segments for downstream LLM inference.

- **Session-Aware Conversational Interface**  
  Maintains conversational continuity while prioritizing document exploration and query resolution workflows.

- **Cross-Platform Runtime**  
  Built with Expo and React Native, enabling deployment across Web, Android, and iOS from a shared codebase.

- **Interactive Visualization Layer**  
  Includes graph-based knowledge visualization, animated UI transitions, and structured navigation components for document interaction workflows.

---

# System Architecture

## Frontend

Built using React Native and Expo with a modular component-driven architecture.

### Stack

- **Framework:** Expo, Expo Router
- **UI Layer:** React Native
- **Styling System:** NativeWind
- **Animation Runtime:** React Native Reanimated
- **Icon System:** Lucide React Native
- **Networking:** Axios

### Responsibilities

- File upload interface
- Conversational query interface
- Citation rendering
- Knowledge graph visualization
- Cross-platform state management and navigation

---

## Backend

Node.js-based backend responsible for ingestion, embedding generation, retrieval orchestration, and inference routing.

### Stack

- **Runtime Framework:** Express.js
- **Vector Database:** Qdrant  
  (`@qdrant/js-client-rest`, `@langchain/qdrant`)
- **LLM Gateway:** OpenRouter
- **Embedding Provider:** OpenAI Embeddings  
  (`@langchain/openai`)
- **Document Parsing:** `pdf-parse`, `csv-parse`
- **Orchestration Layer:** LangChain

### Responsibilities

- Document parsing and preprocessing
- Text chunking and segmentation
- Embedding generation
- Vector indexing and retrieval
- Retrieval-augmented prompt construction
- Citation-aware response generation

---

# Processing Pipeline

1. Document upload
2. Content extraction and parsing
3. Semantic chunk generation
4. Embedding vector creation
5. Qdrant vector indexing
6. Similarity-based retrieval
7. Context injection into LLM prompts
8. Citation-grounded response generation

---

# Installation

## Prerequisites

- Node.js `v18+`
- A running Qdrant instance (local or cloud)
- OpenRouter API credentials

---

# Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `Backend`:

```env
PORT=5000

QDRANT_URL=your_qdrant_cluster_url
QDRANT_API_KEY=your_qdrant_api_key

OPENROUTER_API_KEY=your_openrouter_api_key
MODEL=your_preferred_openrouter_model
```

Example model:

```env
MODEL=openai/gpt-4o-mini
```

Start the development server:

```bash
npm run dev
```

Backend service will run at:

```txt
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `Frontend`:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

Start the Expo development server:

```bash
npm start
```

Platform targets:

- Web: `w`
- iOS Simulator: `i`
- Android Emulator: `a`

---

# Usage Workflow

## 1. Document Ingestion

Upload a PDF or CSV file through the frontend interface.

The backend performs:

- File parsing
- Semantic chunking
- Embedding generation
- Vector indexing into Qdrant

---

## 2. Retrieval-Augmented Querying

Submit natural language queries through the chat interface.

The system:

- Retrieves semantically relevant chunks
- Constructs a context-grounded prompt
- Generates responses using the configured LLM
- Returns citation-linked outputs derived from retrieved context

---

# Supported File Types

- PDF
- CSV

---

# Deployment Targets

- Web
- Android
- iOS
