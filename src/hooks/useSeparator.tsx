import { useDispatch, useSelector } from "react-redux";

import { setSeparatorValue } from "@/redux/reducers/globalSettingsSlice";
import { RootState } from "@/redux/store";

const useSeparator = () => {
  const { valueSeparator } = useSelector(
    (state: RootState) => state.globalSettings,
  );
  const dispatch = useDispatch();

  const changeSeparator = (separator: "none" | "space" | "comma") => {
    dispatch(setSeparatorValue(separator));
  };

  return { valueSeparator, changeSeparator };
};

export default useSeparator;
