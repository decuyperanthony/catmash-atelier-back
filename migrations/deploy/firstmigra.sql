-- Deploy catmash:firstmigra to pg

BEGIN;

-- XXX Add DDLs here.
CREATE TABLE "vote" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "cat_id" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);


COMMIT;
