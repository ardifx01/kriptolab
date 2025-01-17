import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuideState {
  desktop: boolean;
  mobile: boolean;
}

interface InteractiveGuideState {
  marketGuide: GuideState;
  tradingGuide: GuideState;
  portfolioGuide: GuideState;
  transactionsGuide: GuideState;

  landingGuide: GuideState;
  loginGuide: GuideState;
  registerGuide: GuideState;
  profileGuide: GuideState;
}

const initialState: InteractiveGuideState = {
  marketGuide: { desktop: true, mobile: true },
  tradingGuide: { desktop: true, mobile: true },
  portfolioGuide: { desktop: true, mobile: true },
  transactionsGuide: { desktop: true, mobile: true },

  landingGuide: { desktop: true, mobile: true },
  loginGuide: { desktop: true, mobile: true },
  registerGuide: { desktop: true, mobile: true },
  profileGuide: { desktop: true, mobile: true },
};

export const interactiveGuideSlice = createSlice({
  name: "interactiveGuide",
  initialState,
  reducers: {
    setMarketGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.marketGuide[layoutType] = value;
    },
    setTradingGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.tradingGuide[layoutType] = value;
    },
    setPortfolioGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.portfolioGuide[layoutType] = value;
    },
    setTransactionsGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.transactionsGuide[layoutType] = value;
    },
    setLandingGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.landingGuide[layoutType] = value;
    },
    setLoginGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.loginGuide[layoutType] = value;
    },
    setRegisterGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.registerGuide[layoutType] = value;
    },
    setProfileGuide: (
      state,
      action: PayloadAction<{
        layoutType: "desktop" | "mobile";
        value: boolean;
      }>,
    ) => {
      const { layoutType, value } = action.payload;
      state.profileGuide[layoutType] = value;
    },
  },
});

export const {
  setMarketGuide,
  setTradingGuide,
  setPortfolioGuide,
  setTransactionsGuide,
  setLandingGuide,
  setLoginGuide,
  setRegisterGuide,
  setProfileGuide,
} = interactiveGuideSlice.actions;

const interactiveGuideReducer = interactiveGuideSlice.reducer;
export default interactiveGuideReducer;
