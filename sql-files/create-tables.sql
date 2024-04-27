CREATE TABLE users (
	id VARCHAR(255) PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE builds (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL REFERENCES users,
    name VARCHAR(64) NOT NULL,
    description TEXT,
    build JSON NOT NULL,
    is_public BOOLEAN NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE views (
    build_id INTEGER NOT NULL REFERENCES builds,
    user_id VARCHAR(255) REFERENCES users,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE likes (
    build_id INTEGER REFERENCES builds,
    user_id VARCHAR(255) REFERENCES users,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (build_id, user_id)
);