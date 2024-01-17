import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { FC, useDeferredValue, useEffect, useState } from 'react';
import { ITransactionPreview } from '@/interfaces/transaction.interface';
import Link from 'next/link';
import { axiosFetch } from '@/utils/fetchApi';
// import { setTransactionsList } from "@/features/transaction.slice";
// import { store } from "@/store/store";
import { Avatar, Input, List, Skeleton, Select, Space, AutoComplete, SelectProps } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/router';
import { useDebounce } from '@/utils/useDebounce';


const { Search } = Input;
const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

interface ITransactionsProps {
  transactionsList: ITransactionPreview[];
}

export const getServerSideProps: GetServerSideProps<ITransactionsProps> = async (
  { query }: GetServerSidePropsContext
) => {
  try {
    const response = await axiosFetch.get(`/api/transactions/`, { params: query });

    const data: ITransactionPreview[] = await response.data;

    return {
      props: { transactionsList: data },
    };
  } catch (error) {
    // @ts-ignore
    console.error('Error fetching data:', error.message);
    return {
      props: { transactionsList: [] },
    };
  }
};


const Transactions: FC<ITransactionsProps> = ({ transactionsList }) => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const debouncedValue = useDebounce<string>(input, 1000);
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          search: debouncedValue,
        },
      },
      undefined,
      {},
    );
  }, [debouncedValue]);

  const onSearch = (value: string) => {
    setInput(value);
  };


  const handleAutocompleteSearch = (value: string) => {
    setOptions(value ? [{
      value: 'Проект',
      label: 'Проект'}] : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const handleChangeTransactionType = (value: string) => {
    router.push(
      {
        query: {
          ...router.query,
          type: value,
        },
      },
      undefined,
      {},
    );
  };

  const handleChangeTransactionStatus = (value: string) => {
    router.push(
      {
        query: {
          ...router.query,
          status: value,
        },
      },
      undefined,
      {},
    );
  };

  return (
    <div>
      <div style={{
        marginTop: 20,
        marginBottom: 20,
      }}>
        <Space wrap>
          <Select
            defaultValue={router.query.type as string || ''}
            style={{ width: 200 }}
            onChange={handleChangeTransactionType}
            options={[
              {
                value: '',
                label: 'Выберите тип',
                disabled: true,
              },
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
            defaultValue={router.query.status as string || ''}
            style={{ width: 200 }}
            onChange={handleChangeTransactionStatus}
            options={[
              {
                value: '',
                label: 'Выберите статус',
                disabled: true,
              },
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
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleAutocompleteSearch}
            size="large"
          >
            <Search
              defaultValue={router.query.search as string || ''}
              placeholder="Поиск"
              onSearch={onSearch}
              enterButton
              style={{ width: 200 }} />
          </AutoComplete>

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
                <div style={{ marginRight: 10 }}>{item.type}</div>
                <div>{item.status}</div>
              </Skeleton>
            </List.Item>
          )}
        />}
    </div>
  );
};

export default Transactions;
