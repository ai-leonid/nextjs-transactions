import { TransactionTypeEnum, TransactionTypeServiceEnum } from '@/enums/transactionType.enum';
import {
  TransactionStatusEnum,
  TransactionStatusServiceEnum,
} from '@/enums/transactionStatus.enum';

export interface ITransaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionTypeEnum;
  description: string;
  status: TransactionStatusEnum;
  category: string;
  paymentDetail: string;
  [key: string]: string | number | undefined;
}

export interface ITransactionService {
  id: string;
  date: string;
  amount: number;
  type: TransactionTypeServiceEnum;
  description: string;
  status: TransactionStatusServiceEnum;
  category: string;
  paymentDetail: string;
  [key: string]: string | number | undefined;
}
