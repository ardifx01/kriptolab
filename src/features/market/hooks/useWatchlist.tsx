import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setWatchlist } from "@/redux/reducers/globalSettingsSlice";
import { RootState } from "@/redux/store";

const useWatchlist = () => {
  const { watchlist } = useSelector((state: RootState) => state.globalSettings);
  const dispatch = useDispatch();

  const updateWatchlist = useCallback(
    (val: string) => {
      if (watchlist.includes(val)) {
        dispatch(setWatchlist(watchlist.filter((item) => item !== val)));
      } else {
        dispatch(setWatchlist([...watchlist, val]));
      }
    },
    [dispatch, watchlist],
  );

  return { watchlist, updateWatchlist };
};

export default useWatchlist;
