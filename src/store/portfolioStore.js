import { create } from "zustand";

export const usePortfolioStore = create((set) => ({
  data: {},

  setData: (newData) =>
    set((state) => ({
      data: {
        ...state.data,
        ...newData,
      },
    })),
}));