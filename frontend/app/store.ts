import { configureStore } from "@reduxjs/toolkit";
import rentalReducer from "@/features/rental/rentalSlice";
import paymentReducer from "@/features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    rental: rentalReducer,
    payment: paymentReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
