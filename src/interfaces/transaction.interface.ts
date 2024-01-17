import { TransactionTypeEnum } from "@/enums/transactionType.enum";
import { TransactionStatusEnum } from "@/enums/transactionStatus.enum";

export interface ITransactionPreview {
  id: string;
  date: string;
  amount: number;
  type: TransactionTypeEnum;
  description: string;
}
export interface ITransaction extends ITransactionPreview {
  status: TransactionStatusEnum;
  category: string;
  paymentDetail: string;
}
