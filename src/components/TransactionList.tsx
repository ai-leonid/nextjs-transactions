import React, { FC } from "react";
import { List, Skeleton } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ITransaction } from "@/interfaces/transaction.interface";

interface ITransactionListProps {
  transactionsList: ITransaction[];
}

const TransactionList: FC<ITransactionListProps> = ({ transactionsList }) => {
  const { t } = useTranslation();

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={transactionsList}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link key="details" href={`/transactions/${item.id}`}>
              {t("detailsLink")}
            </Link>,
          ]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              title={item.amount}
              description={`${item.description} | ' ${item.date}`}
            />
            <div style={{ marginRight: 10 }}>{item.type}</div>
            <div>{item.status}</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default TransactionList;
