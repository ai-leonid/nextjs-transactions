import { GetStaticProps } from 'next';
import React, { FC, useState } from 'react';
import { ITransactionPreview } from '@/interfaces/transaction.interface';
import Link from 'next/link';
import { axiosFetch } from '@/utils/fetchApi';
// import { setTransactionsList } from "@/features/transaction.slice";
// import { store } from "@/store/store";
import { Avatar, Button, List, Skeleton, Select, Space } from 'antd';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';

interface ITransactionsProps {
  transactionsList: ITransactionPreview[];
}

export const getServerSideProps: GetStaticProps<ITransactionsProps> = async ({ query }) => {
  try {
    console.log('getServerSideProps');
    const response = await axiosFetch.get(`/api/transactions/`, { params: query });

    const data: ITransactionPreview[] = await response.data;

    console.log('-----------data');
    console.log(data);

    return {
      props: { transactionsList: data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { transactionsList: [] },
    };
  }
};


const Transactions: FC<ITransactionsProps> = ({ transactionsList }) => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const search = (e: any) => {
    setInput(e.target.value);
    console.log('You searched', input);
  };

  const handleChangeTransactionType = (value: string) => {
    router.push(
      {
        ...router,
        query: {
          ...router.query,
          type: value,
        },
      },
      undefined,
    );
  };

  const handleChangeTransactionStatus = (value: string) => {
    router.push(
      {
        ...router,
        query: {
          ...router.query,
          status: value,
        },
      },
      undefined,
    );
  };


  return (
    <div>
      <div>
        <Space wrap>
          <Select
            defaultValue="income"
            style={{ width: 120 }}
            onChange={handleChangeTransactionType}
            options={[
              {
                value: 'income',
                label: 'income',
              },
              {
                value: 'expense',
                label: 'expense',
              },
            ]}
          />
          <Select
            defaultValue="pending"
            style={{ width: 120 }}
            onChange={handleChangeTransactionStatus}
            options={[
              {
                value: 'pending',
                label: 'pending',
              },
              {
                value: 'completed',
                label: 'completed',
              },
              {
                value: 'failed',
                label: 'failed',
              },
            ]}
          />
          <input type="text" placeholder="Search for a note..." value={input} onChange={search} />
        </Space>
      </div>
      {transactionsList &&
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={transactionsList}
          renderItem={(item) => (
            <List.Item
              actions={[<Link key="details" href={`/transactions/${item.id}`}>Подробнее</Link>]}
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
                  description={`${item.description} | ' ${item.date}`}
                />
                <div style={{marginRight: 10}}>{item.type}</div>
                <div>{item.status}</div>
              </Skeleton>
            </List.Item>
          )}
        />}
    </div>
  );
};

export default Transactions;
