# AcademiQ

> An AI-powered professor discovery platform using RAG (Retrieval-Augmented Generation) for semantic search and personalized recommendations, enabling students to make data-driven educational decisions.

## 🚀 Tech Stack & Engineering Decisions

**Frontend Framework**
- **Next.js 14 (App Router)** - Server-side rendering with React Server Components for optimal performance. Route groups (`(auth)`, `(protected)`, `(landing)`) enforce clear separation of concerns.
- **TypeScript** - Full type safety across the stack with strict mode enabled.

**State & Data Management**
- **TanStack Query** - Server state synchronization with automatic caching and invalidation. Used in `ProfessorsList.tsx` to handle optimistic UI updates for professor creation.
- **React Hook Form + Zod** - Form validation with type-safe schemas. `zodResolver` ensures runtime validation matches TypeScript types.

**Database & ORM**
- **PostgreSQL (Neon Serverless)** - Serverless Postgres with built-in connection pooling via `@neondatabase/serverless`.
- **Drizzle ORM** - Type-safe SQL query builder. Schema definitions in `/lib/db/schema` auto-generate TypeScript types using `drizzle-zod`.
- **pgvector Extension** - Stores 1024-dimensional Mistral embeddings with HNSW indexing for sub-50ms vector similarity search.

**AI & Embeddings**
- **Mistral AI** - `mistral-embed` model generates semantic embeddings; `mistral-large-latest` powers the chat assistant with tool-calling capabilities.
- **RAG Implementation** - Cosine similarity search (threshold > 0.5) retrieves relevant professor context before LLM inference. See `lib/ai/embedding.ts`.
- **Streaming Responses** - Uses Vercel AI SDK's `streamText` for token-by-token UI updates, reducing perceived latency.

**Authentication**
- **Clerk** - Middleware-protected routes with automatic session management. Server actions verify `auth().userId` before database mutations.

**UI/UX**
- **Shadcn/ui + Radix UI** - Accessible primitives with custom styling. Accordion, Dialog, and Select components follow WAI-ARIA patterns.
- **Framer Motion** - Declarative animations for page transitions and interactive elements.
- **Tailwind CSS** - Utility-first styling with custom theme extensions in `tailwind.config.ts`.

**Environment Validation**
- **@t3-oss/env-nextjs** - Runtime environment variable validation using Zod schemas. Build fails if required env vars are missing (see `lib/env.mjs`).

## ✨ Key Features

- **AI-Powered Chat Assistant** - Conversational interface with RAG-enhanced responses. Automatically summarizes reviews and recommends professors based on semantic similarity.
- **Intelligent Web Scraping** - AI-driven content extraction from professor profile URLs. Mistral parses unstructured HTML into structured data (name, department, subjects).
- **Vector Semantic Search** - Query professors by natural language. Embedding similarity retrieves contextually relevant results beyond keyword matching.
- **Advanced Filtering** - Multi-dimensional search by rating, department, subject, and college with real-time updates.
- **Review System** - Students submit ratings and reviews with cascade deletion (reviews auto-delete when professors are removed).
- **Type-Safe API Layer** - Server actions enforce authentication and validation. All mutations return typed responses with Drizzle-generated schemas.

## 🏗️ System Architecture

### Data Flow

```mermaid
graph TB
    A[Client Request] --> B{Clerk Auth Middleware}
    B -->|Authenticated| C[Next.js Server Actions]
    B -->|Unauthenticated| D[Redirect to Sign-In]
    C --> E[Drizzle ORM]
    E --> F[(PostgreSQL + pgvector)]
    C --> G[Mistral AI API]
    G --> H[Generate Embeddings]
    H --> F
    F --> I[Vector Similarity Search]
    I --> J[RAG Context]
    J --> G
    G --> K[Streaming Response]
    K --> A
```

### RAG Pipeline

1. **Ingestion** - When professors are created, biographical data is chunked and embedded via `mistral-embed` (1024 dimensions).
2. **Storage** - Embeddings stored in `embeddings` table with HNSW index for approximate nearest neighbor search.
3. **Retrieval** - User queries are embedded and compared using cosine distance. Top 4 results with similarity > 0.5 are retrieved.
4. **Generation** - Retrieved context is injected into the LLM prompt, grounding responses in factual data.

### Tool-Calling Architecture

The chat assistant uses two tools defined in `/app/api/mistral/chat/route.ts`:
- `addResource` - Stores user-provided professor data into the knowledge base.
- `getInformation` - Queries the vector database for relevant context before responding.

### Database Schema

- **professors** - Core entity with subjects (text array), tags (text array), and foreign key to colleges.
- **reviews** - Linked to professors with cascade deletion.
- **embeddings** - Stores chunked content with vector representations, indexed via `vector_cosine_ops`.
- **resources** - Metadata for embedded content (referenced by `embeddings.resourceId`).

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database with pgvector extension (Neon recommended)
- Clerk account for authentication
- Mistral AI API key

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# AI
MISTRAL_API_KEY=your_mistral_api_key

# Optional
NODE_ENV=development
```

### Installation

```bash
# Install dependencies
npm install

# Generate Drizzle migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

Access the application at `http://localhost:3000`.

### Database Management

```bash
# Push schema changes without migrations
npm run db:push

# Open Drizzle Studio (visual database editor)
npm run db:studio

# Rollback migrations
npm run db:drop
```

## 🔮 Future Improvements / Known Issues

**Testing**
- Add unit tests for server actions (Vitest + MSW recommended).
- Implement E2E tests for critical user flows (Playwright).

**Performance**
- Implement React Server Components data fetching to reduce client-side JavaScript.
- Add Redis caching layer for frequently accessed professor profiles.

**Features**
- Email notifications for new reviews via Clerk webhooks.
- Professor verification system (badge for claimed profiles).
- Comparative professor analytics dashboard.

**Infrastructure**
- Add API rate limiting to prevent abuse of scraping endpoint.
- Implement error monitoring (Sentry integration).
- Set up CI/CD pipeline with automated database migrations.

**UI/UX**
- Mobile responsive design improvements (current layout is desktop-optimized).
- Dark mode persistence using cookies instead of localStorage.
- Accessibility audit for keyboard navigation.
