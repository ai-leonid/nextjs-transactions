// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/pages/api/data/transactions';
import {
  ITransaction,
  ITransactionPreview,
} from '@/interfaces/transaction.interface';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITransactionPreview[] | ITransaction | null | string>,
) {
  const token = req.headers.authorization;

  if (token !== process.env.TOKEN) {
    return res.status(401).send('unauthorised');
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).send('bad request id is required');
  }

  const transaction = transactions.find(
    (t) => t.id == id,
  );


  if (!transaction) {
    return res.status(404).send('Error');
  }

  res.status(200).send(transactions);

}
