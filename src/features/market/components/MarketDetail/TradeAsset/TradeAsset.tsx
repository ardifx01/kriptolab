import React, { useState } from "react";

import { TabPanel } from "@headlessui/react";

import TabCustom from "@/components/Tab/TabCustom";
import { ITokenDetails } from "@/types";

import BuyPanel from "./BuyPanel";
import SellPanel from "./SellPanel";

interface Props {
  token?: ITokenDetails;
}

const TRADE_TABS: { label: string; value: string }[] = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
];

const TradeAsset = ({ token }: Props) => {
  const [tradeTabs, setTradeTabs] = useState(TRADE_TABS[0].value);
  const currentIndex = TRADE_TABS.findIndex((v) => v.value === tradeTabs);

  if (!token) return <>Loading..</>;

  return (
    <div className="min-h-[300px] w-full rounded-xl border border-borderColor">
      <TabCustom
        tabs={TRADE_TABS.map((v) => v.label)}
        onChange={(i) => setTradeTabs(TRADE_TABS[i].value)}
        currentIndex={currentIndex}
      >
        <TabPanel>
          <BuyPanel token={token} />
        </TabPanel>
        <TabPanel>
          <SellPanel token={token} />
        </TabPanel>
      </TabCustom>
    </div>
  );
};

export default TradeAsset;
