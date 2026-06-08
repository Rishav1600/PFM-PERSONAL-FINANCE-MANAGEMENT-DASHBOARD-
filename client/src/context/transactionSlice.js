import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from '../services/transactionService';

const initialState = {
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Fetch all transactions
export const getTransactions = createAsyncThunk(
    'transactions/getAll',
    async (_, thunkAPI) => {
        try {
            return await transactionService.getTransactions();
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create new transaction
export const addTransaction = createAsyncThunk(
    'transactions/add',
    async (transactionData, thunkAPI) => {
        try {
            return await transactionService.createTransaction(transactionData);
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete transaction
export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id, thunkAPI) => {
        try {
            return await transactionService.deleteTransaction(id);
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload.id
                );
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
