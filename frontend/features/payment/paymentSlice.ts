import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  book_id: null,
  provider_id: null,
  paymentType: null, // "purchase" | "rental"
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      const { book_id, provider_id, paymentType } = action.payload;
      state.book_id = book_id;
      state.provider_id = provider_id;
      state.paymentType = paymentType;
    },
    clearPaymentData: (state) => {
      state.book_id = null;
      state.provider_id = null;
      state.paymentType = null;
    },
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
