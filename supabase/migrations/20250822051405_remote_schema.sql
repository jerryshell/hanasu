

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."bookmarks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "companion_id" "uuid" DEFAULT "gen_random_uuid"(),
    "user_id" "text"
);


ALTER TABLE "public"."bookmarks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."companions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text",
    "subject" "text",
    "topic" "text",
    "style" "text",
    "voice" "text",
    "duration" bigint,
    "author" "text"
);


ALTER TABLE "public"."companions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."session_history" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "text",
    "companion_id" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."session_history" OWNER TO "postgres";


ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."companions"
    ADD CONSTRAINT "companions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."session_history"
    ADD CONSTRAINT "session_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_companion_id_fkey" FOREIGN KEY ("companion_id") REFERENCES "public"."companions"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."session_history"
    ADD CONSTRAINT "session_history_companion_id_fkey" FOREIGN KEY ("companion_id") REFERENCES "public"."companions"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "All" ON "public"."companions" FOR SELECT TO "anon" USING (true);



CREATE POLICY "All" ON "public"."session_history" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Clerk" ON "public"."bookmarks" USING ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL)) WITH CHECK ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL));



CREATE POLICY "Clerk" ON "public"."companions" TO "authenticated" USING ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL)) WITH CHECK ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL));



CREATE POLICY "Clerk" ON "public"."session_history" TO "authenticated" USING ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL)) WITH CHECK ((( SELECT "auth"."jwt"() AS "jwt") IS NOT NULL));



ALTER TABLE "public"."bookmarks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."companions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."session_history" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";



GRANT ALL ON TABLE "public"."companions" TO "anon";
GRANT ALL ON TABLE "public"."companions" TO "authenticated";
GRANT ALL ON TABLE "public"."companions" TO "service_role";



GRANT ALL ON TABLE "public"."session_history" TO "anon";
GRANT ALL ON TABLE "public"."session_history" TO "authenticated";
GRANT ALL ON TABLE "public"."session_history" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
