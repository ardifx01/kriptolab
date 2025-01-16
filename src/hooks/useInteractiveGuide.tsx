import { useDispatch, useSelector } from "react-redux";

import {
  setLandingGuide,
  setLoginGuide,
  setMarketGuide,
  setPortfolioGuide,
  setProfileGuide,
  setRegisterGuide,
  setTradingGuide,
  setTransactionsGuide,
} from "@/redux/reducers/interactiveGuide";
import { RootState } from "@/redux/store";

const useInteractiveGuide = () => {
  const {
    landingGuide,
    loginGuide,
    registerGuide,
    marketGuide,
    tradingGuide,
    portfolioGuide,
    transactionsGuide,
    profileGuide,
  } = useSelector((state: RootState) => state.interactiveGuide);

  const dispatch = useDispatch();

  // Helper function to mark a guide as completed
  const completeGuide = (
    guideName: keyof RootState["interactiveGuide"],
    layoutType: "desktop" | "mobile",
  ) => {
    switch (guideName) {
      case "landingGuide":
        dispatch(setLandingGuide({ layoutType, value: false }));
        break;
      case "loginGuide":
        dispatch(setLoginGuide({ layoutType, value: false }));
        break;
      case "registerGuide":
        dispatch(setRegisterGuide({ layoutType, value: false }));
        break;
      case "marketGuide":
        dispatch(setMarketGuide({ layoutType, value: false }));
        break;
      case "tradingGuide":
        dispatch(setTradingGuide({ layoutType, value: false }));
        break;
      case "portfolioGuide":
        dispatch(setPortfolioGuide({ layoutType, value: false }));
        break;
      case "transactionsGuide":
        dispatch(setTransactionsGuide({ layoutType, value: false }));
        break;
      case "profileGuide":
        dispatch(setProfileGuide({ layoutType, value: false }));
        break;
      default:
        console.warn(`Unknown guide: ${guideName}`);
    }
  };

  // Helper function to check if a guide is active
  const isGuideActive = (
    guideName: keyof RootState["interactiveGuide"],
    layoutType: "desktop" | "mobile",
  ) => {
    const guideState = {
      landingGuide,
      loginGuide,
      registerGuide,
      marketGuide,
      tradingGuide,
      portfolioGuide,
      transactionsGuide,
      profileGuide,
    }[guideName];

    return guideState[layoutType];
  };

  return {
    landingGuide,
    loginGuide,
    registerGuide,
    marketGuide,
    tradingGuide,
    portfolioGuide,
    transactionsGuide,
    profileGuide,
    completeGuide,
    isGuideActive,
  };
};

export default useInteractiveGuide;
