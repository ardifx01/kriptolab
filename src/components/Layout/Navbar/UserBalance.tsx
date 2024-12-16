import React from "react";

import classNames from "classnames";
import { WalletIcon } from "lucide-react";

import useModal from "@/hooks/useModal";
import usePortfolio from "@/hooks/usePortfolio";

const UserBalance = () => {
  const { formattedBalance } = usePortfolio();
  const { openDepositModal } = useModal();

  return (
    <button
      className={classNames(
        "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs md:text-sm",
        "border-borderColor bg-cardBackground hover:bg-primaryAccent/30",
      )}
      onClick={openDepositModal}
    >
      <WalletIcon className="size-4" /> Rp.
      {formattedBalance}
    </button>
  );
};

export default UserBalance;
