// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/pages/api/data/transactions";
import { ITransaction } from "@/interfaces/transaction.interface";
import { findInObjects } from "@/utils/findInObjects";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITransaction[] | ITransaction | null | string>,
) {
  const token = req.headers.authorization;
  if (token === process.env.TOKEN) {
    const { search, type, status } = req.query;

    let resultTransactions: ITransaction[] = transactions;
    if (type) {
      resultTransactions = transactions.filter((item) => item.type === type);
    }

    if (status) {
      resultTransactions = resultTransactions.filter(
        (item) => item.status === status,
      );
    }

    if (search) {
      resultTransactions = findInObjects(resultTransactions, search as string);
    }

    res.status(200).send(resultTransactions);
  } else {
    res.status(401).send("unauthorised");
  }
}
