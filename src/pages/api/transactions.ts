// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/pages/api/data/transactions';
import {
  ITransaction,
  ITransactionPreview,
} from '@/interfaces/transaction.interface';
import { findInObjects } from '@/utils/findInObjects';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITransactionPreview[] | ITransaction | null | string>,
) {
  const token = req.headers.authorization;
  if (token === process.env.TOKEN) {
    console.log('handler');
    console.log(req.query);

    const {
      search,
      type,
      status,
    } = req.query;

    let resultTransactions: ITransaction[] = transactions;
    if (type) {
      resultTransactions = transactions.filter((item) =>
        item.type.indexOf(type as string) !== -1);
    }

    if (status) {
      resultTransactions = resultTransactions.filter((item) => item.status.indexOf(status as string) !== -1);
    }

    if (search) {
      resultTransactions = findInObjects(resultTransactions, search);
    }

    res.status(200).send(resultTransactions);

  } else {
    res.status(401).send('unauthorised');
  }
}
