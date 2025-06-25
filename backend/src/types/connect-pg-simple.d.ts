declare module 'connect-pg-simple' {
  import { Store } from 'express-session';
  import { Pool } from 'pg';

  interface PgSessionStoreOptions {
    pool?: Pool;
    pgPromise?: any;
    conString?: string;
    tableName?: string;
    schemaName?: string;
    ttl?: number;
    disableTouch?: boolean;
    createTableIfMissing?: boolean;
    pruneSessionInterval?: boolean | number;
    errorLog?: (...args: any[]) => void;
  }

  function connectPgSimple(session: any): {
    new (options?: PgSessionStoreOptions): Store;
  };

  export = connectPgSimple;
}