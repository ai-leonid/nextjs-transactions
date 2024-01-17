import { GetStaticProps } from "next";
import React, { FC } from "react";
import { ITransactionPreview } from "@/interfaces/transaction.interface";
import Link from "next/link";
import { axiosFetch } from "@/utils/fetchApi";
import { setTransactionsList } from "@/features/transaction.slice";
import { store } from "@/store/store";
import { Avatar, Button, List } from 'antd';
import { faker } from '@faker-js/faker';

interface ITransactionsProps {
  transactionsList: ITransactionPreview[];
}

export const getStaticProps: GetStaticProps<ITransactionsProps> = async () => {
  try {
    const response = await axiosFetch.get(`/api/transactions/`);

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
              actions={[<Button type="link" key="list-loadmore-more">Подробнее</Button>]}
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={faker.image.urlPlaceholder({
                      width: 80,
                      height: 80,
                      text: faker.word.adjective({ strategy: 'shortest' }),
                    })} />}
                  title={faker.finance.amount({
                    min: -10000,
                    max: 10000,
                  })}
                  description={'Kaspi Black | ' + faker.date.anytime().toISOString().slice(0, 10)}
                />
                <div>{faker.finance.transactionType()}</div>
              </Skeleton>
            </List.Item>
          )}
        />}
    </div>
  );
};

export default Transactions;
