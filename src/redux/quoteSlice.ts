import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Quote = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

type QuoteTag = {
  _id: string;
  name: string;
  slug: string;
  quoteCount: number;
  dateAdded: string;
  dateModified: string;
};

type InitialState = {
  quote: Quote | null;
  quoteTags: QuoteTag[];
  error: string;
};

const initialState: InitialState = {
  quote: null,
  quoteTags: [],
  error: '',
};

const api = 'https://api.quotable.io';

export const fetchQuote = createAsyncThunk(
  'quote/fetchQuote',
  async (tag: string) => {
    const res = await axios.get(
      `${api}/quotes/random${tag !== 'random' ? `?tags=${tag}` : ''}`
    );
    return res.data;
  }
);

export const fetchTags = createAsyncThunk('quote/fetchTags', async () => {
  const res = await axios.get(`${api}/tags`);
  return res.data;
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchQuote.pending, state => {
      state.quote = null;
    });
    builder.addCase(fetchQuote.fulfilled, (state, action) => {
      state.quote = action.payload[0];
    });
    builder.addCase(fetchQuote.rejected, (state, action) => {
      state.error = action.error.message || 'An unknown error occured!';
    });

    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.quoteTags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.error = action.error.message || 'An unknown error occured!';
    });
  },
});

export default quoteSlice.reducer;
