import { TransactionTypeEnum } from "@/enums/transactionType.enum";
import { TransactionStatusEnum } from "@/enums/transactionStatus.enum";

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
