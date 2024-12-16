import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_PROFILE } from "@/constants";
import useAuth from "@/features/auth/hooks/useAuth";
import { setUser } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store";
import { IUser } from "@/types";

import { useCustomSWR } from "./useCustomSWR";

const useUser = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { isLoggedIn } = useAuth();

  const { data, error, isLoading, mutate } = useCustomSWR<IUser>(
    isLoggedIn ? API_PROFILE : null,
    "authenticated",
  );

  const updateUser = useCallback(
    (val: IUser) => {
      dispatch(setUser(val));
    },
    [dispatch],
  );

  useEffect(() => {
    if (data) {
      updateUser(data);
    } else {
      updateUser({
        _id: "",
        email: "",
        role: "",
        provider: "",
        profile: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          image: "",
        },
        createdAt: "",
        updatedAt: "",
      });
    }
  }, [data, updateUser]);

  return { user, isLoading, error, mutate, updateUser };
};

export default useUser;
