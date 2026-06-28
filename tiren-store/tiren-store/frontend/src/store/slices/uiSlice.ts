import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState { darkMode: boolean; searchOpen: boolean; mobileMenuOpen: boolean; }

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: typeof window !== 'undefined' ? localStorage.getItem('tiren_dark') === 'true' : false,
    searchOpen: false, mobileMenuOpen: false,
  } as UIState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (typeof window !== 'undefined') localStorage.setItem('tiren_dark', String(state.darkMode));
    },
    setDarkMode(state, action: PayloadAction<boolean>) { state.darkMode = action.payload; },
    setSearchOpen(state, action: PayloadAction<boolean>) { state.searchOpen = action.payload; },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) { state.mobileMenuOpen = action.payload; },
  },
});

export const { toggleDarkMode, setDarkMode, setSearchOpen, setMobileMenuOpen } = uiSlice.actions;
export default uiSlice.reducer;
