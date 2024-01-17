import { FC } from "react";
import { axiosFetch } from "@/utils/fetchApi";
import { GetServerSidePropsContext } from "next";
import { ITransaction } from "@/interfaces/transaction.interface";

interface IDetailProps {
  transaction: ITransaction;
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.query.id;

  try {
    const response = await axiosFetch.get(`transactions?id=${id}`);
    const data: ITransaction = await response.data;

    return {
      props: { transaction: data },
    };
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return {
      notFound: true,
    };
  }
};

const DetailTransaction: FC<IDetailProps> = ({ transaction }) => {
  return (
    <>
      <p>Detail</p>
      {transaction && (
        <>
          <p>{transaction.status}</p>
          <p>{transaction.id}</p>
          <p>{transaction.paymentDetail}</p>

          <p>{transaction.amount}</p>
          <p>{transaction.description}</p>
        </>
      )}
    </>
  );
};
export default DetailTransaction;
