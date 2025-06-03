import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  token: string | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{
        userId: string;
        token: string;
      }>
    ) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.loggedIn = true;
    },
    clearAuthData: (state) => {
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
