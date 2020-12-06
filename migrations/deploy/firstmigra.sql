-- Deploy catmash:firstmigra to pg

BEGIN;

-- XXX Add DDLs here.
CREATE TABLE "cat" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "image_path" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "vote" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "cat_id" INT NOT NULL REFERENCES "cat"("id"),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);

INSERT INTO "cat" ("name", "image_path") VALUES
('MTgwODA3MA', 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg'),
('tt', 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg'),
('bmp', 'http://25.media.tumblr.com/tumblr_m4bgd9OXmw1qioo2oo1_500.jpg'),
('c8a', 'http://24.media.tumblr.com/tumblr_lzxok2e2kX1qgjltdo1_1280.jpg');





COMMIT;
