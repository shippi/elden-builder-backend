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

SELECT builds.*, COUNT(views.build_id), CAST(COUNT(DISTINCT likes.build_id) AS BIT) as liked FROM builds
                    FULL JOIN views ON builds.id = views.build_id
                    FULL JOIN likes ON likes.build_id = builds.id 
                    WHERE builds.is_public=TRUE AND builds.id = likes.build_id AND likes.user_id = '3U4RgAJVybNrSeWgKCOsfqz8Ng43'
                    GROUP BY id
                    ORDER by count DESC