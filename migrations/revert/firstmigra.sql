-- Revert catmash:firstmigra from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE IF EXISTS "vote";

COMMIT;
