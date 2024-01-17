import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/pages/api/data/transactions';
import {
  ITransaction,
  ITransactionPreview,
} from '@/interfaces/transaction.interface';
import { findInObjects } from '@/utils/findInObjects';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>,
) {
  const {
    search,
  } = req.query;

  let dropdownList: string[] = [];

  if (search) {
    dropdownList = findInObjects(transactions, search as string, 'description');
    // dropdownList = findInObjects(dropdownList, search as string, 'paymentDetail');
  }

  const flatDropdown = dropdownList.map(item => item.description);

  res.status(200).send(flatDropdown);
}
