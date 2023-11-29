import { db } from "@/server/db";
import { fieldSed } from "./data";


async function main() {
  //    await instrumentCategoriesSeed();
  //    await instrumentTypesSeed();
  //    await instrumentsSeed();
  //     await currenciesSeed();
      await fieldSed();
  }
  
  main()
      .then(async () => {
          await db.$disconnect();
      })
      .catch(async (e) => {
          console.error(e);
          await db.$disconnect();
          process.exit(1);
      });

