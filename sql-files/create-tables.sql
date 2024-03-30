CREATE TABLE users (
	id VARCHAR(255) PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	username VARCHAR(255) UNIQUE NOT NULL
)

CREATE TABLE builds (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL REFERENCES users,
    name VARCHAR(64) NOT NULL,
    build JSON NOT NULL,
    public BOOLEAN NOT NULL
)