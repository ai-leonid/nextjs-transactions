import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Select,
  Space,
  AutoComplete,
  SelectProps,
  Input,
  DatePicker,
  notification,
} from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDebounce } from '@/utils/useDebounce';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { axiosFetch } from '@/utils/fetchApi';
import { ITransaction } from '@/interfaces/transaction.interface';
import Diagram from '@/components/Diagram';
import Sums from '@/components/Sums';
import TransactionList from '@/components/TransactionList';
import { TransactionTypeEnum, TransactionTypeServiceEnum } from '@/enums/transactionType.enum';
import {
  TransactionStatusEnum,
  TransactionStatusServiceEnum,
} from '@/enums/transactionStatus.enum';
import dayjs, { Dayjs } from 'dayjs';

const { Search } = Input;
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

interface ITransactionsProps {
  transactionsList: ITransaction[];
  resStatus: number | null;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const dateFormat = 'YYYY-MM-DD';

export const getServerSideProps: GetServerSideProps<
  ITransactionsProps
> = async ({ query }: GetServerSidePropsContext) => {
  try {
    const response = await axiosFetch.get(`/transactions/`, { params: query });
    const status = response.status;
    const data: ITransaction[] = await response.data;

    return {
      props: {
        transactionsList: data,
        resStatus: status,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        transactionsList: [],
        resStatus: null,
      },
    };
  }
};

const Transactions: FC<ITransactionsProps> = ({
  transactionsList,
  resStatus,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const [statusSelect, setStatusSelect] = useState('');
  const [datePickerValue, setDatePickerValue] = useState<RangeValue>(null);
  const router = useRouter();
  const debouncedValue = useDebounce<string>(searchInput, 1000);
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
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

  useEffect(() => {
    const {
      dateEnd,
      dateStart,
      type,
      status,
    } = router.query;

    if (dateStart && dateEnd) {
      setDatePickerValue([
        dayjs(dateStart as string, dateFormat),
        dayjs(dateEnd as string, dateFormat),
      ]);
    }
    // if (type) {
    //   setTypeSelect(type as string);
    // }
    //
    // if (status) {
    //   setStatusSelect(status as string);
    // }
  }, [router.query]);


  const onSearch = (value: string) => {
    setSearchInput(value);
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

  const onSelect = (value: string) => {
    setSearchInput(value);
  };

  const onRangePickerChange = (value: RangeValue) => {
    setDatePickerValue(value);

    if (value) {
      const dateStartVal = value[0]?.format(dateFormat);
      const dateEndVal = value[1]?.format(dateFormat);

      router.push(
        {
          query: {
            ...router.query,
            dateStart: dateStartVal,
            dateEnd: dateEndVal,
          },
        },
        undefined,
        {},
      );
    } else {
      delete router.query.dateStart;
      delete router.query.dateEnd;

      router.push(
        {
          query: {
            ...router.query,
          },
        },
        undefined,
        {},
      );
    }
  };

  const onClearTypeChange = () => {
    setTypeSelect('');

    const {
      type,
      ...rest
    } = router.query;

    router.push(
      {
        query: {
          ...rest,
        },
      },
      undefined,
      {},
    );
  };

  const onClearStatusChange = () => {
    setStatusSelect('');

    const {
      status,
      ...rest
    } = router.query;

    router.push(
      {
        query: {
          ...rest,
        },
      },
      undefined,
      {},
    );
  };

  const handleChangeTransactionType = (value: string) => {

    if (value) {
      setTypeSelect(value);

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
    }

  };

  const handleChangeTransactionStatus = (value: string) => {
    if (value) {
      setStatusSelect(value);
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
    }
  };

  return (
    <div>
      <div>
        <Space wrap
          style={{
            width: '100%',
            margin: '20px auto',
            justifyContent: 'space-between',
          }}>
          <Select
            allowClear
            onClear={onClearTypeChange}
            value={typeSelect}
            style={{ width: 230 }}
            onChange={handleChangeTransactionType}
            options={[
              {
                value: '',
                label: t('selectType'),
                disabled: true,
              },
              {
                value: TransactionTypeServiceEnum.INCOME,
                label: t('income'),
              },
              {
                value: TransactionTypeServiceEnum.EXPENSE,
                label: t('expense'),
              },
            ]}
          />
          <Select
            allowClear
            onClear={onClearStatusChange}
            value={statusSelect}
            style={{ width: 230 }}
            onChange={handleChangeTransactionStatus}
            options={[
              {
                value: '',
                label: t('selectStatus'),
                disabled: true,
              },
              {
                value: TransactionStatusServiceEnum.PENDING,
                label: t('pending'),
              },
              {
                value: TransactionStatusServiceEnum.COMPLETED,
                label: t('completed'),
              },
              {
                value: TransactionStatusServiceEnum.FAILED,
                label: t('failed'),
              },
            ]}
          />
          <RangePicker
            value={datePickerValue}
            style={{ width: 300 }}
            onChange={onRangePickerChange} />
        </Space>
        <Space style={{
          width: '100%',
          justifyContent: 'flex-end',
        }}>
          <AutoComplete
            style={{ width: '100%' }}
            options={options}
            onSelect={onSelect}
            onSearch={handleAutocompleteSearch}
          >
            <Search
              defaultValue={(router.query.search as string) || ''}
              placeholder={t('searchPlaceholder')}
              onSearch={onSearch}
              enterButton
              style={{ width: 300 }}
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
