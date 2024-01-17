import { GetStaticProps } from "next";
import React, { FC } from "react";
import { ITransactionPreview } from "@/interfaces/transaction.interface";
import Link from "next/link";
import { axiosFetch } from "@/utils/fetchApi";
// import { setTransactionsList } from "@/features/transaction.slice";
// import { store } from "@/store/store";
import { Avatar, Button, List, Skeleton } from 'antd';
import { faker } from '@faker-js/faker';

interface ITransactionsProps {
  transactionsList: ITransactionPreview[];
}

export const getServerSideProps: GetStaticProps<ITransactionsProps> = async () => {
  try {
    const response = await axiosFetch.get(`/api/transactions/`);

    const data: ITransactionPreview[] = await response.data;

    return {
      props: { transactionsList: data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { transactionsList: [] },
    };
  }
};


const Transactions: FC<ITransactionsProps> = ({ transactionsList }) => {
  return (
    <div style={{ minHeight: '80vh' }}>
      {transactionsList &&
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={transactionsList}
          renderItem={(item) => (
            <List.Item
              actions={[<Link  key="details" href={`/transactions/${item.id}`}>Подробнее</Link>]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={faker.image.urlPlaceholder({
                      width: 80,
                      height: 80,
                      text: faker.word.adjective({ strategy: 'shortest' }),
                    })} />}
                  title={item.amount}
                  description={`${item.description} | ' + ${item.date}`}
                />
                <div>{item.type}</div>
              </Skeleton>
            </List.Item>
          )}
        />}
    </div>
  );
};

export default Transactions;
