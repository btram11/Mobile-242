import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RentalState {
  startDate: string | null;
  endDate: string | null;
}

const initialState: RentalState = {
  startDate: null,
  endDate: null,
};

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    clearDates(state) {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const { setStartDate, setEndDate, clearDates } = rentalSlice.actions;
export default rentalSlice.reducer;
