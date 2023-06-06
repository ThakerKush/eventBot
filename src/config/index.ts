import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DC_TOKEN: string;
    }
  }
}

const { DC_TOKEN } = process.env;

export { DC_TOKEN };
