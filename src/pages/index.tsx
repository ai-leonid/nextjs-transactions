import Head from 'next/head';
import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

function Home() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);


  useEffect(() => {
    fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      setInitLoading(false);
      setData(res.results);
      setList(res.results);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({
        loading: true,
        name: {},
        picture: {},
      }))),
    );
    fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      const newData = data.concat(res.results);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <>
      <Head>
        <title>Транзакции</title>
        <meta name="description" content="Мои транзакции" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type="link" key="list-loadmore-more">Подробнее</Button>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
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
      />
    </>
  );
}


export default Home;
