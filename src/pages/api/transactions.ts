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
  if (token === process.env.TOKEN) {
    console.log('handler');
    console.log(req.query);
    const {
      id,
      type,
      status,
    } = req.query;

    let resultTransactions: any = transactions;
    if (type) {
      resultTransactions = transactions.filter((item) =>
        item.type.indexOf(type as string) !== -1);
    }

    console.log('----------HERE 938D134391A18726');
    console.log(resultTransactions);
    if (status) {
      resultTransactions = resultTransactions.filter((item) => item.status.indexOf(status as string) !== -1);
    }

    res.status(200).send(resultTransactions);

  } else {
    res.status(401).send('unauthorised');
  }
}
