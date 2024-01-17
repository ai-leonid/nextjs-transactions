import { GetStaticProps } from "next";
import { FC } from "react";
import { ITransactionPreview } from "@/interfaces/transaction.interface";
import Link from "next/link";
import { axiosFetch } from "@/utils/fetchApi";
import { setTransactionsList } from "@/features/transaction.slice";
import { store } from "@/store/store";

interface ITransactionsProps {
  transactionsList: ITransactionPreview[];
}

export const getStaticProps: GetStaticProps<ITransactionsProps> = async () => {
  try {
    const response = await axiosFetch.get(`transactions/`);

    const data: ITransactionPreview[] = await response.data;
    store.dispatch(setTransactionsList(data));

    return {
      props: { transactionsList: data, status },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { transactionsList: [] },
    };
  }
};

// ...

const Transactions: FC<ITransactionsProps> = ({ transactionsList }) => {
  return (
    <>
      <p>main</p>
      {transactionsList &&
        transactionsList.map((item) => (
          <Link key={item.id} href={`/transactions/${item.id}`}>
            <p>{item.date}</p>
            <p>{item.amount}</p>
            <p>{item.type}</p>
          </Link>
        ))}
    </>
  );
};

export default Transactions;
