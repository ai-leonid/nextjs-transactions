import type { NextApiRequest, NextApiResponse } from 'next';
import { transactions } from '@/pages/api/data/transactions';
import {
  ITransaction,
  ITransactionPreview,
} from '@/interfaces/transaction.interface';
import { findInObjects } from '@/utils/findInObjects';

export type DropdownType = {
  value: string,
  label: string,
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DropdownType[]>,
) {
  const {
    search,
  } = req.query;

  let dropdownList: ITransaction[] = [];

  if (search) {
    dropdownList = findInObjects(transactions, search as string, 'description');
    // dropdownList = findInObjects(dropdownList, search as string, 'paymentDetail');
  }

  const flatDropdown: DropdownType[] = dropdownList.map((item) => ({
    value: item.description,
    label: item.description,
  }));

  res.status(200).send(flatDropdown);
}
