import { createSlice } from "@reduxjs/toolkit";
import {
  ITransaction,
  ITransactionPreview,
} from "@/interfaces/transaction.interface";

interface IInitialState {
  transactionsList: ITransactionPreview[];
  transaction: ITransaction[] | null;
}

const initialState: IInitialState = {
  transactionsList: [],
  transaction: null,
};

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setTransactionsList: (state, action) => {
      state.transactionsList = action.payload;
    },
  },
});

export const { setTransactionsList } = transactionSlice.actions;
