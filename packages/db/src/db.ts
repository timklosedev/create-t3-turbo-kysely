import { createKysely } from "@vercel/postgres-kysely";

import type { DB } from "../prisma/types";
import { env } from "../env";

export const db = createKysely<DB>({
  connectionString: env.POSTGRES_URL,
});
