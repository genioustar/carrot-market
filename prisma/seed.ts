/**
 * test data 생성하는 부분(pagenation 테스트를 위해서)
 */
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 16,
          },
        },
      },
    });
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
