CREATE DATABASE ResourceDatabase;

CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    description VARCHAR(256),
    title VARCHAR(256),
    link VARCHAR(2084),
    tag VARCHAR(32)
);

