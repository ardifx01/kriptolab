import React from "react";

import {
  ArrowRightLeftIcon,
  DollarSignIcon,
  LineChartIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const TradingGuidePage = () => {
  return (
    <TutorialLayout title="Trading Guide">
      <MainTitle>
        How to Start <span className="text-primaryAccent">Trading</span> in
        KriptoLab
      </MainTitle>
      <section id="introduction">
        <Paragraph>
          Learn how to <b>buy and sell cryptocurrencies</b> in KriptoLab using
          real market data from Indodax. Simulate trades with no risk and
          experience how fees work in a real-world trading environment!
        </Paragraph>
      </section>

      <section id="deposit-idr" className="mt-5">
        <SectionTitle>
          <DollarSignIcon /> Deposit IDR Amount
        </SectionTitle>
        <Paragraph>
          Before trading, you need to deposit an IDR balance into your simulated
          wallet. Here’s how:
        </Paragraph>
        <OrderedList>
          <ListItem>
            Click the <b>Balance</b> in the top-right corner of the website or
            navigate to the <b>Portfolio</b> page.
          </ListItem>
          <ListItem>
            Click the <b>Deposit</b> button.
          </ListItem>
          <ListItem>
            Enter the deposit amount you want to add to your balance.
          </ListItem>
          <ListItem>
            Click <b>Confirm Deposit</b>.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Once done, your IDR balance will be updated, and you’re ready to start
          trading.
        </Paragraph>
        {/* Screenshot placeholder */}
      </section>

      <section id="select-pair" className="mt-5">
        <SectionTitle>
          <LineChartIcon /> Select a Trading Pair
        </SectionTitle>
        <Paragraph>
          Choose the crypto token you want to buy or sell in the Marketplace.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Go to the <b>Marketplace</b> page.
          </ListItem>
          <ListItem>
            Browse or search for your desired trading pair (e.g., <b>BTC/IDR</b>
            ).
          </ListItem>
          <ListItem>
            Click on the pair to open the <b>Market Detail Page</b>.
          </ListItem>
        </OrderedList>
        {/* Screenshot placeholder */}
      </section>

      <section id="buy-token" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> Buy a Token
        </SectionTitle>
        <Paragraph>
          Follow these steps to buy crypto using your IDR balance.
        </Paragraph>
        <OrderedList>
          <ListItem>
            On the Market Detail Page, locate the <b>Buy Section</b>.
          </ListItem>
          <ListItem>
            Enter the amount of IDR you want to spend or the token amount to
            purchase.
          </ListItem>
          <ListItem>
            Use quick percentage options (<b>25%, 50%, 75%, 100%</b>) to
            auto-calculate the trade.
          </ListItem>
          <ListItem>
            Click <b>Confirm Buy</b> to place the order.
          </ListItem>
        </OrderedList>
        <Paragraph>
          A small fee will be deducted from your trade to simulate real Indodax
          fees.
        </Paragraph>
        {/* Screenshot placeholder */}
      </section>

      <section id="sell-token" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> Sell a Token
        </SectionTitle>
        <Paragraph>Here’s how to sell crypto back to IDR balance:</Paragraph>
        <OrderedList>
          <ListItem>
            On the Market Detail Page, locate the <b>Sell Section</b>.
          </ListItem>
          <ListItem>
            Enter the token amount you want to sell or the amount of IDR you
            want to receive.
          </ListItem>
          <ListItem>
            Use quick percentage options (<b>25%, 50%, 75%, 100%</b>) to
            auto-calculate the trade.
          </ListItem>
          <ListItem>
            Click <b>Confirm Sell</b> to place the order.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Similar to buying, a small fee will be applied to simulate trading
          costs.
        </Paragraph>
        {/* Screenshot placeholder */}
      </section>

      <section id="check-portfolio" className="mt-5">
        <SectionTitle>
          <LineChartIcon /> Track Your Trades in Portfolio
        </SectionTitle>
        <Paragraph>
          After completing your trades, you can check your updated balance and
          token holdings.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Portfolio</b> page.
          </ListItem>
          <ListItem>
            View your token holdings, total IDR balance, and trade summary.
          </ListItem>
          <ListItem>
            Check transaction history to see all your buy/sell activities.
          </ListItem>
        </OrderedList>
        {/* Screenshot placeholder */}
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> You’re Ready to Trade!
        </SectionTitle>
        <Paragraph>
          That’s it! You’ve learned how to buy, sell, and track your trades in
          KriptoLab. Start exploring different pairs and practice your trading
          strategies risk-free.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/market-overview">
            Review the Market Overview Tutorial
          </LinkItem>
          <LinkItem link="/portfolio">
            Track your trades in the Portfolio
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default TradingGuidePage;
