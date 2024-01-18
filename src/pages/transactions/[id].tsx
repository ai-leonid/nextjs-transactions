import { FC } from "react";
import { axiosFetch } from "@/utils/fetchApi";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { GetServerSidePropsContext } from "next";
import { ITransaction } from "@/interfaces/transaction.interface";

interface IDetailProps {
  transaction: ITransaction;
  dataDescription: DescriptionsProps["items"];
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.query.id;

  try {
    const response = await axiosFetch.get(`/transactions/${id}`);
    const data: ITransaction = await response.data;

    const dataDescription = Object.keys(data).map((item) => {
      return {
        key: item,
        label: item,
        children: data[item] as keyof ITransaction,
      };
    });

    return {
      props: { transaction: data, dataDescription },
    };
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return {
      notFound: true,
    };
  }
};

const DetailTransaction: FC<IDetailProps> = ({
  transaction,
  dataDescription,
}) => {
  return (
    <>
      <p>Detail</p>
      {transaction && (
        <Descriptions title="Transaction Detail" items={dataDescription} />
      )}
    </>
  );
};
export default DetailTransaction;
