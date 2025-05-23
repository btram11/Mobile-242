import { configureStore } from "@reduxjs/toolkit";
import rentalReducer from "@/features/rental/rentalSlice";
import paymentReducer from "@/features/payment/paymentSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    rental: rentalReducer,
    payment: paymentReducer,
    auth: authReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
