import { TransactionTypeEnum } from "@/enums/transactionType.enum";
import { TransactionStatusEnum } from "@/enums/transactionStatus.enum";

export interface ITransactionPreview {
  id: string;
  date: string;
  amount: number;
  type: TransactionTypeEnum;
  description: string;
  status: TransactionStatusEnum;
}
export interface ITransaction extends ITransactionPreview {
  category: string;
  paymentDetail: string;
  [key: string]: string | number | undefined;
}
