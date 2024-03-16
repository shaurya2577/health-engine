CREATE DATABASE ResourceDatabase;
CREATE TYPE tag AS ENUM ('partnership', 'dataset', 'guide');

CREATE TABLE resources(
    resource_id SERIAL PRIMARY KEY,
    description VARCHAR(256),
    title VARCHAR(256),
    link VARCHAR(2083),
    class tag
);

