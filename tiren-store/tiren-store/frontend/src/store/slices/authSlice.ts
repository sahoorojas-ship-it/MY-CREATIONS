import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = { user: null, token: null, loading: false, error: null };

export const loginUser = createAsyncThunk('auth/login', async (data: { email?: string; phone?: string; password: string }) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data.data;
});

export const registerUser = createAsyncThunk('auth/register', async (data: { name: string; email?: string; phone?: string; password: string }) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data.data;
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data: { phone: string; otp: string; name?: string }) => {
  const res = await axios.post(`${API}/auth/verify-otp`, data);
  return res.data.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('tiren_token');
        localStorage.removeItem('tiren_user');
      }
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    hydrateAuth(state, action: PayloadAction<{ user: User | null; token: string | null }>) {
  state.user = action.payload.user;
  state.token = action.payload.token;
},
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => { state.loading = true; state.error = null; };
    const handleFulfilled = (state: AuthState, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('tiren_token', action.payload.token);
        localStorage.setItem('tiren_user', JSON.stringify(action.payload.user));
      }
    };
    const handleRejected = (state: AuthState, action: any) => {
      state.loading = false;
      state.error = action.error.message || 'Failed';
    };
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(verifyOTP.pending, handlePending)
      .addCase(verifyOTP.fulfilled, handleFulfilled)
      .addCase(verifyOTP.rejected, handleRejected);
  },
});

export const { logout, setUser, hydrateAuth } = authSlice.actions;

export default authSlice.reducer;
