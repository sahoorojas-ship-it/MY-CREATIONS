import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Product slice
export interface Product {
  id: string; name: string; slug: string; brand: string; description: string;
  categoryId: string; category: { name: string; slug: string };
  images: string[]; basePrice: number; discountPrice?: number; discountPercent?: number;
  stock: number; unit: string; weightOptions?: string[]; tags: string[];
  isFeatured: boolean; isBestSeller: boolean; isNewArrival: boolean;
  avgRating: number; reviewCount: number;
}

interface ProductState {
  products: Product[]; featured: Product[]; bestSellers: Product[]; newArrivals: Product[];
  currentProduct: Product | null; loading: boolean; error: string | null; total: number;
}

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], featured: [], bestSellers: [], newArrivals: [], currentProduct: null, loading: false, error: null, total: 0 } as ProductState,
  reducers: {
    setProducts(state, action: PayloadAction<{ products: Product[]; total: number }>) {
      state.products = action.payload.products; state.total = action.payload.total;
    },
    setFeatured(state, action: PayloadAction<Product[]>) { state.featured = action.payload; },
    setBestSellers(state, action: PayloadAction<Product[]>) { state.bestSellers = action.payload; },
    setNewArrivals(state, action: PayloadAction<Product[]>) { state.newArrivals = action.payload; },
    setCurrentProduct(state, action: PayloadAction<Product>) { state.currentProduct = action.payload; },
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload; },
    setError(state, action: PayloadAction<string | null>) { state.error = action.payload; },
  },
});

export const { setProducts, setFeatured, setBestSellers, setNewArrivals, setCurrentProduct, setLoading, setError } = productSlice.actions;
export const productReducer = productSlice.reducer;
export default productReducer;
