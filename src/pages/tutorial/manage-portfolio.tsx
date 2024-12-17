import React from "react";

import {
  BarChartIcon,
  ChartLineIcon,
  SearchIcon,
  WalletIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const PortfolioManagementPage = () => {
  return (
    <TutorialLayout title="Portfolio Management Guide">
      <MainTitle>
        Manage Your <span className="text-primaryAccent">Portfolio</span> in
        KriptoLab
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          Learn how to <b>track, manage, and understand</b> your crypto assets
          in KriptoLab. Monitor your total balance, view asset performance, and
          make informed trading decisions!
        </Paragraph>
      </section>

      <section id="idr-balance" className="mt-5">
        <SectionTitle>
          <WalletIcon /> IDR Balance Management
        </SectionTitle>
        <Paragraph>
          View and manage your Indonesian Rupiah (IDR) balance in your simulated
          wallet.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Portfolio</b> page to see your current{" "}
            <b>Total IDR Balance</b>.
          </ListItem>
          <ListItem>
            Click the <b>Deposit</b> button to add funds to your simulated
            wallet.
          </ListItem>
          <ListItem>
            Click the <b>Withdraw</b> button to simulate withdrawing funds.
          </ListItem>
          <ListItem>
            The total balance is prominently displayed at the top of the
            Portfolio page.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Your IDR balance represents the total funds available for trading and
          investment.
        </Paragraph>
      </section>

      <section id="asset-chart" className="mt-5">
        <SectionTitle>
          <ChartLineIcon /> Asset Performance Chart
        </SectionTitle>
        <Paragraph>
          Visualize your total asset value and track its performance over time.
        </Paragraph>
        <OrderedList>
          <ListItem>
            The <b>Asset Chart Section</b> shows your total asset value in IDR.
          </ListItem>
          <ListItem>
            Use timeframe selectors to view performance:
            <b> 1 Day, 1 Week, 1 Month, All Time</b>.
          </ListItem>
          <ListItem>
            The chart dynamically updates to show your asset value changes.
          </ListItem>
          <ListItem>
            Hover over data points to see precise value and date details.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Understanding your asset performance helps in making informed trading
          decisions.
        </Paragraph>
      </section>

      <section id="asset-list" className="mt-5">
        <SectionTitle>
          <BarChartIcon /> Crypto Asset List
        </SectionTitle>
        <Paragraph>
          Detailed overview of your crypto holdings and their current value.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Use the <b>Search</b> feature to quickly find specific tokens.
          </ListItem>
          <ListItem>
            The Asset List displays each token with:
            <UnorderedList>
              <ListItem>Token Name</ListItem>
              <ListItem>Token Symbol</ListItem>
              <ListItem>Amount Held</ListItem>
              <ListItem>Current Value in IDR</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Sort columns by clicking on column headers for easy comparison.
          </ListItem>
          <ListItem>
            Click on a specific token to view detailed transaction history.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Stay informed about your entire crypto portfolio at a glance.
        </Paragraph>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <SearchIcon /> Explore Your Portfolio!
        </SectionTitle>
        <Paragraph>
          You're now equipped to manage and track your crypto assets in
          KriptoLab. Regularly check your portfolio to stay updated on your
          investments.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/trading-guide">
            Revisit Trading Guide
          </LinkItem>
          <LinkItem link="/marketplace">Explore Crypto Marketplace</LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default PortfolioManagementPage;
