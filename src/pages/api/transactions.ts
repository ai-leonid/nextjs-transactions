// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/pages/api/data/transactions";
import {
  ITransaction,
  ITransactionPreview,
} from "@/interfaces/transaction.interface";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITransactionPreview[] | ITransaction | null | string>,
) {
  const token = req.headers.authorization;
  if (token === process.env.TOKEN) {
    console.log(req.query);
    const { id } = req.query;

    if (id) {
      console.log(id);
      const transaction = transactions.find((t) => t.id == id);
      if (transaction) {
        console.log(transaction);
        res.status(200).send(transaction);
      } else {
        res.status(404).send("Error");
      }
    } else {
      res.status(200).send(transactions);
    }
  } else {
    res.status(401).send("unauthorised");
  }
}
