import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { jwtDecode } from "jwt-decode";

import { showToast } from "@/components/Toast/CustomToast";
import { setJwtToken } from "@/redux/reducers/globalSettingsSlice";
import { RootState } from "@/redux/store";

const useAuth = () => {
  const { jwttoken } = useSelector((state: RootState) => state.globalSettings);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoggedIn = useMemo(() => !!jwttoken, [jwttoken]);

  const updateJwttoken = (token: string) => {
    dispatch(setJwtToken(token));
  };

  const logout = useCallback(
    (message?: string) => {
      if (!jwttoken) return;
      dispatch(setJwtToken(null));
      showToast.success(message ? message : t("Logged out successfully"));
    },
    [dispatch, jwttoken, t],
  );

  const checkIfJWTTokenExpired = useCallback(() => {
    try {
      if (!jwttoken) {
        logout();
      } else {
        const decodedToken = jwtDecode(jwttoken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  }, [jwttoken, logout]);

  return {
    jwttoken,
    updateJwttoken,
    logout,
    checkIfJWTTokenExpired,
    isLoggedIn,
  };
};

export default useAuth;
