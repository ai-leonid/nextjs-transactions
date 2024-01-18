import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Select,
  Space,
  AutoComplete,
  SelectProps,
  Input,
  notification,
} from "antd";
import { useDebounce } from "@/utils/useDebounce";
import { useTranslation } from "react-i18next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { axiosFetch } from "@/utils/fetchApi";
import { ITransaction } from "@/interfaces/transaction.interface";
import Diagram from "@/components/Diagram";
import Sums from "@/components/Sums";
import TransactionList from "@/components/TransactionList";
import { TransactionTypeEnum } from "@/enums/transactionType.enum";
import { TransactionStatusEnum } from "@/enums/transactionStatus.enum";

const { Search } = Input;

interface ITransactionsProps {
  transactionsList: ITransaction[];
  resStatus: number | null;
}

export const getServerSideProps: GetServerSideProps<
  ITransactionsProps
> = async ({ query }: GetServerSidePropsContext) => {
  try {
    const response = await axiosFetch.get(`/transactions/`, { params: query });
    const status = response.status;
    const data: ITransaction[] = await response.data;

    return {
      props: { transactionsList: data, resStatus: status },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { transactionsList: [], resStatus: null },
    };
  }

  return {
    props: { transactionsList: [], resStatus: null },
  };
};

const Transactions: FC<ITransactionsProps> = ({
  transactionsList,
  resStatus,
}) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const debouncedValue = useDebounce<string>(input, 1000);
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const { t } = useTranslation();

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
    setOptions(
      value
        ? Array.from(
            new Set(
              transactionsList
                .filter((t) =>
                  t.category.toLowerCase().includes(value.toLowerCase()),
                )
                .map((t) => t.category),
            ),
          ).map((category) => ({
            value: category,
            label: category,
          }))
        : [],
    );
  };

  const onSelect = (value: string) => {};

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          margin: "20px auto",
        }}
      >
        <Space wrap>
          <Select
            defaultValue={(router.query.type as string) || ""}
            style={{ width: 200 }}
            onChange={handleChangeTransactionType}
            options={[
              {
                value: "",
                label: t("selectType"),
                disabled: true,
              },
              {
                value: TransactionTypeEnum.income,
                label: t("income"),
              },
              {
                value: TransactionTypeEnum.expense,
                label: t("expense"),
              },
            ]}
          />
          <Select
            defaultValue={(router.query.status as string) || ""}
            style={{ width: 200 }}
            onChange={handleChangeTransactionStatus}
            options={[
              {
                value: "",
                label: t("selectStatus"),
                disabled: true,
              },
              {
                value: TransactionStatusEnum.pending,
                label: t("pending"),
              },
              {
                value: TransactionStatusEnum.completed,
                label: t("completed"),
              },
              {
                value: TransactionStatusEnum.failed,
                label: t("failed"),
              },
            ]}
          />
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleAutocompleteSearch}
          >
            <Search
              defaultValue={(router.query.search as string) || ""}
              placeholder={t("searchPlaceholder")}
              onSearch={onSearch}
              enterButton
              style={{ width: 200 }}
            />
          </AutoComplete>
        </Space>
      </div>
      <Sums transactionsList={transactionsList} />
      <Diagram transactionsList={transactionsList} />
      {transactionsList && (
        <TransactionList transactionsList={transactionsList} />
      )}
    </div>
  );
};

export default Transactions;
