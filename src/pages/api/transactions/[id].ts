// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/pages/api/data/transactions";
import { ITransaction } from "@/interfaces/transaction.interface";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITransaction | null | string>,
) {
  const token = req.headers.authorization;
  if (token === process.env.TOKEN) {
    const { id } = req.query;

    if (id) {
      const transaction = transactions.find((t) => t.id == id);
      if (transaction) {
        res.status(200).send(transaction);
      } else {
        res.status(404).send("Error");
      }
    }
  } else {
    res.status(401).send("unauthorised");
  }
}
