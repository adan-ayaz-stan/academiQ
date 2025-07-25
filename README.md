# AcademiQ - Professor Review & Discovery Platform

## Project Overview

**AcademiQ** is an intelligent professor rating and discovery platform that leverages **AI-powered recommendations** to help students make informed educational decisions **because** traditional professor selection often lacks comprehensive, easily accessible information **which results in** students being able to discover the best-fit educators through data-driven insights, peer reviews, and intelligent matching algorithms.

## What It Does

AcademiQ serves as a comprehensive platform where students can:

- **Discover Professors**: Browse detailed professor profiles with ratings, subjects, departments, and college affiliations
- **Submit Reviews**: Share experiences and rate professors to help future students
- **AI-Powered Chat**: Interact with an intelligent assistant that provides personalized professor recommendations based on RAG (Retrieval-Augmented Generation) technology
- **Smart Data Collection**: Automatically extract professor information from web sources using AI-powered scraping
- **Advanced Filtering**: Find professors by rating, department, subject, and college with sophisticated search capabilities

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management with Zod validation
- **TanStack Query** - Server state management

### Backend & Database

- **PostgreSQL** - Primary database with Neon serverless hosting
- **Drizzle ORM** - Type-safe database toolkit
- **Drizzle Kit** - Database migrations and introspection

### AI & Machine Learning

- **Mistral AI** - Large language model for chat and content generation
- **Vector Embeddings** - Semantic search and content similarity
- **RAG (Retrieval-Augmented Generation)** - Context-aware AI responses
- **AI SDK** - Streamlined AI integration

### Authentication & Security

- **Clerk** - User authentication and session management

### Additional Tools

- **Cheerio** - Web scraping and HTML parsing
- **Ky** - HTTP client for API requests
- **React Markdown** - Markdown rendering with syntax highlighting
- **Fuse.js** - Fuzzy search capabilities

## Technical Implementation

### 1. **RAG-Powered AI Assistant**

- Uses Mistral embeddings to create vector representations of professor data
- Implements cosine similarity search for relevant content retrieval
- Provides contextual responses about professors based on stored knowledge

### 2. **Intelligent Web Scraping**

- Automated professor data extraction from web pages
- AI-powered content parsing to structure professor information
- Integration with the main database for seamless data flow

### 3. **Advanced Search & Filtering**

- Multi-dimensional filtering by rating, department, and subjects
- Fuzzy search implementation for flexible professor discovery
- Real-time search with optimized database queries

### 4. **Vector Database Architecture**

- Embedding storage for semantic search capabilities
- Efficient similarity computation using cosine distance
- Chunked content processing for optimal retrieval

### 5. **Real-time Chat Interface**

- Streaming AI responses for better user experience
- Tool-based architecture for dynamic functionality
- Context-aware conversations with professor recommendation logic

### 6. **Type-Safe Development**

- End-to-end TypeScript implementation
- Zod schema validation for forms and API routes
- Drizzle ORM for type-safe database operations

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and configure:
# - DATABASE_URL (Neon PostgreSQL)
# - CLERK_SECRET_KEY & NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - MISTRAL_API_KEY

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## Database Commands

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio

# Push schema changes
npm run db:push
```

## Architecture Highlights

- **Serverless-first**: Built for scalable deployment with Neon and Vercel
- **AI-Native**: Deep integration of machine learning throughout the application
- **Type-Safe**: Comprehensive TypeScript coverage from frontend to database
- **Modern Stack**: Latest web technologies with performance optimization
- **Accessible**: Built with accessibility-first component library (Radix UI)
