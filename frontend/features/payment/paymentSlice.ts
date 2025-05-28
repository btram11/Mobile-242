// src/features/payment/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  book_id: string | null;
  listing_id: string | null;
  paymentType: "purchase" | "rental" | null;
  // mới thêm 2 field cho rental
  startDate: string | null;
  endDate: string | null;
}

const initialState: PaymentState = {
  book_id: null,
  listing_id: null,
  paymentType: null,
  startDate: null,
  endDate: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // payload có thể chứa startDate & endDate (chỉ dùng khi rental)
    setPaymentData: (
      state,
      action: PayloadAction<{
        book_id: string;
        listing_id: string;
        paymentType: "purchase" | "rental";
        startDate?: string;
        endDate?: string;
      }>
    ) => {
      const { book_id, listing_id, paymentType, startDate, endDate } =
        action.payload;

      state.book_id = book_id;
      state.listing_id = listing_id;
      state.paymentType = paymentType;

      if (paymentType === "rental") {
        // nếu là rental thì lưu ngày, default null nếu undefined
        state.startDate = startDate ?? null;
        state.endDate = endDate ?? null;
      } else {
        // nếu không phải rental thì clear ngày
        state.startDate = null;
        state.endDate = null;
      }
    },

    // riêng action để clear toàn bộ
    clearPaymentData: (state) => {
      state.book_id = null;
      state.listing_id = null;
      state.paymentType = null;
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
