-- ==============================================================================
-- CineMate Production PostgreSQL Schema
-- AI-Powered Movie Discovery & Recommendation Platform
-- ==============================================================================

-- Enable UUID extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    avatar VARCHAR(512),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Movies Table
CREATE TABLE IF NOT EXISTS movies (
    id VARCHAR(64) PRIMARY KEY,
    tmdb_id INTEGER UNIQUE,
    imdb_id VARCHAR(32),
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    tagline TEXT,
    overview TEXT NOT NULL,
    release_date DATE,
    release_year INTEGER,
    runtime INTEGER, -- in minutes
    poster_url VARCHAR(512) NOT NULL,
    backdrop_url VARCHAR(512) NOT NULL,
    trailer_url VARCHAR(512),
    trailer_key VARCHAR(64),
    vote_average DECIMAL(3, 1) DEFAULT 0.0,
    vote_count INTEGER DEFAULT 0,
    popularity DECIMAL(10, 2) DEFAULT 0.0,
    language VARCHAR(16) DEFAULT 'en',
    origin_country VARCHAR(64) DEFAULT 'US',
    budget BIGINT DEFAULT 0,
    revenue BIGINT DEFAULT 0,
    streaming_platforms JSONB DEFAULT '[]'::jsonb, -- e.g. ["Netflix", "Prime Video", "Apple TV"]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Genres Table
CREATE TABLE IF NOT EXISTS genres (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    slug VARCHAR(64) UNIQUE NOT NULL
);

-- 4. Actors Table
CREATE TABLE IF NOT EXISTS actors (
    id VARCHAR(64) PRIMARY KEY,
    tmdb_id INTEGER UNIQUE,
    name VARCHAR(255) NOT NULL,
    profile_url VARCHAR(512),
    character_default VARCHAR(255),
    popularity DECIMAL(10, 2) DEFAULT 0.0
);

-- 5. Directors Table
CREATE TABLE IF NOT EXISTS directors (
    id VARCHAR(64) PRIMARY KEY,
    tmdb_id INTEGER UNIQUE,
    name VARCHAR(255) NOT NULL,
    profile_url VARCHAR(512),
    popularity DECIMAL(10, 2) DEFAULT 0.0
);

-- 6. Movie <-> Genre Mapping
CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    genre_id VARCHAR(64) REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

-- 7. Movie <-> Cast Mapping
CREATE TABLE IF NOT EXISTS movie_cast (
    id VARCHAR(64) PRIMARY KEY,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    actor_id VARCHAR(64) REFERENCES actors(id) ON DELETE CASCADE,
    character_name VARCHAR(255) NOT NULL,
    order_index INTEGER DEFAULT 0
);

-- 8. Movie <-> Director Mapping
CREATE TABLE IF NOT EXISTS movie_directors (
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    director_id VARCHAR(64) REFERENCES directors(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, director_id)
);

-- 9. Watch History
CREATE TABLE IF NOT EXISTS watch_history (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    watch_duration INTEGER DEFAULT 0, -- in minutes
    completed BOOLEAN DEFAULT TRUE,
    device VARCHAR(64) DEFAULT 'web'
);

-- 10. Watchlists
CREATE TABLE IF NOT EXISTS watchlists (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(128) NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Watchlist Movies
CREATE TABLE IF NOT EXISTS watchlist_movies (
    id VARCHAR(64) PRIMARY KEY,
    watchlist_id VARCHAR(64) REFERENCES watchlists(id) ON DELETE CASCADE,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    personal_notes TEXT,
    user_rating DECIMAL(3, 1),
    is_watched BOOLEAN DEFAULT FALSE,
    UNIQUE (watchlist_id, movie_id)
);

-- 12. Ratings (1-10 Scale)
CREATE TABLE IF NOT EXISTS ratings (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id)
);

-- 13. Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    title VARCHAR(255),
    content TEXT NOT NULL,
    contains_spoilers BOOLEAN DEFAULT FALSE,
    helpful_upvotes INTEGER DEFAULT 0,
    helpful_downvotes INTEGER DEFAULT 0,
    status VARCHAR(32) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'flagged', 'removed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Review Votes (Upvote / Downvote)
CREATE TABLE IF NOT EXISTS review_votes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    review_id VARCHAR(64) REFERENCES reviews(id) ON DELETE CASCADE,
    vote_type VARCHAR(8) CHECK (vote_type IN ('UP', 'DOWN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, review_id)
);

-- 14. User Preferences & Taste Profiles
CREATE TABLE IF NOT EXISTS user_preferences (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    favorite_genres JSONB DEFAULT '[]'::jsonb,
    favorite_actors JSONB DEFAULT '[]'::jsonb,
    favorite_directors JSONB DEFAULT '[]'::jsonb,
    preferred_languages JSONB DEFAULT '["en", "hi"]'::jsonb,
    max_duration INTEGER DEFAULT 180,
    taste_weights JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Conversations & CineMate AI Chat Messages
CREATE TABLE IF NOT EXISTS conversations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'New Chat',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(64) PRIMARY KEY,
    conversation_id VARCHAR(64) REFERENCES conversations(id) ON DELETE CASCADE,
    sender VARCHAR(16) NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- contains recommended movie IDs and intent tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Recommendations & Recommendation Logs
CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    movie_id VARCHAR(64) REFERENCES movies(id) ON DELETE CASCADE,
    score DECIMAL(5, 4) NOT NULL, -- e.g. 0.9450 (94.5% match)
    engine VARCHAR(32) DEFAULT 'hybrid', -- 'content', 'collaborative', 'ai_semantic', 'hybrid'
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Moderation Reports
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    reporter_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    review_id VARCHAR(64) REFERENCES reviews(id) ON DELETE CASCADE,
    reason VARCHAR(255) NOT NULL,
    status VARCHAR(32) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- Performance Indexes
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies (title);
CREATE INDEX IF NOT EXISTS idx_movies_popularity ON movies (popularity DESC);
CREATE INDEX IF NOT EXISTS idx_movies_vote_average ON movies (vote_average DESC);
CREATE INDEX IF NOT EXISTS idx_movies_release_year ON movies (release_year DESC);
CREATE INDEX IF NOT EXISTS idx_movie_genres_genre ON movie_genres (genre_id);
CREATE INDEX IF NOT EXISTS idx_movie_cast_actor ON movie_cast (actor_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_user ON watch_history (user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlists (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_movie ON reviews (movie_id);
CREATE INDEX IF NOT EXISTS idx_ratings_movie ON ratings (movie_id);
CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages (conversation_id);
