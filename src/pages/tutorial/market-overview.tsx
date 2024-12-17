import React from "react";

import { BarChart2Icon, TrendingUpIcon, WalletIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";
import SubTitle from "@/features/tutorial/components/Typography/SubTitle";

const MarketOverviewPage = () => {
  return (
    <TutorialLayout title="Market Overview">
      <MainTitle>
        Explore the <span className="text-primaryAccent">Market Overview</span>
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          The Market Overview is the heart of KriptoLab. Here, you can see live
          crypto prices, track trending assets, and make informed decisions
          before simulating trades.
        </Paragraph>
        <Paragraph>
          This tutorial will guide you through each section of the Market Page
          step-by-step. You’ll learn how to:
        </Paragraph>
        <UnorderedList>
          <LinkItem link="#market-listings">View live market listings</LinkItem>
          <LinkItem link="#market-filters">
            Filter and search for crypto assets
          </LinkItem>
          <LinkItem link="#market-details">
            Understand the Market Detail Page
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="market-listings" className="mt-5">
        <SectionTitle>
          <BarChart2Icon /> View Live Market Listings
        </SectionTitle>
        <Paragraph>
          The Market Listings table shows live data for all supported crypto
          assets. You’ll see key details like prices, volumes, and price
          changes.
        </Paragraph>
        <div>
          <SubTitle>1. Navigate to the Market Page</SubTitle>
          <Paragraph>
            To view the full list of crypto assets, follow these steps:
          </Paragraph>
          <OrderedList>
            <ListItem>Click "Market" on the main navigation bar.</ListItem>
            <ListItem>
              You’ll see the Market Listings Table showing all crypto assets.
            </ListItem>
          </OrderedList>
          screenshot
        </div>

        <div>
          <SubTitle>2. Understand the Table Columns</SubTitle>
          <Paragraph>Here’s what each column in the table means:</Paragraph>
          <UnorderedList>
            <ListItem>
              <b>Token Name</b> - The name of the cryptocurrency (e.g., Bitcoin,
              Ethereum).
            </ListItem>
            <ListItem>
              <b>Token Pair</b> - Trading pairs available for the token (e.g.,
              BTC/IDR, ETH/IDR).
            </ListItem>
            <ListItem>
              <b>Price</b> - The current market price of the token.
            </ListItem>
            <ListItem>
              <b>24h Volume</b> - Total trading volume for the last 24 hours.
            </ListItem>
            <ListItem>
              <b>24h Change</b> - Price change percentage over the past 24
              hours.
            </ListItem>
            <ListItem>
              <b>7d Change</b> - Price change percentage over the past 7 days.
            </ListItem>
          </UnorderedList>
          screenshot
        </div>
      </section>

      <section id="market-filters" className="mt-5">
        <SectionTitle>
          <TrendingUpIcon /> Filter and Search for Crypto Assets
        </SectionTitle>
        <Paragraph>
          Finding your favorite coins is easy with KriptoLab’s filter and search
          tools.
        </Paragraph>
        <div>
          <SubTitle>1. Use the Search Bar</SubTitle>
          <Paragraph>To quickly find a specific crypto asset:</Paragraph>
          <OrderedList>
            <ListItem>
              At the top of the Market Listings Table, locate the Search Bar.
            </ListItem>
            <ListItem>
              Type the name or ticker of the cryptocurrency (e.g., BTC).
            </ListItem>
            <ListItem>
              The table will filter to show only matching results.
            </ListItem>
          </OrderedList>
          screenshot
        </div>

        <div>
          <SubTitle>2. Filter by Trending Coins</SubTitle>
          <Paragraph>
            Want to see what’s hot? Use the Trending filter:
          </Paragraph>
          <OrderedList>
            <ListItem>Click the "Trending" button above the table.</ListItem>
            <ListItem>
              The table will update to show top trending assets.
            </ListItem>
          </OrderedList>
          screenshot
        </div>
      </section>

      <section id="market-details" className="mt-5">
        <SectionTitle>
          <WalletIcon /> Understand the Market Detail Page
        </SectionTitle>
        <Paragraph>
          Clicking on any asset will take you to its Market Detail Page, where
          you can analyze the crypto’s performance and simulate trades.
        </Paragraph>
        <div>
          <SubTitle>1. Open the Market Detail Page</SubTitle>
          <Paragraph>
            To access detailed information about a cryptocurrency:
          </Paragraph>
          <OrderedList>
            <ListItem>
              In the Market Listings Table, click on the crypto you want to
              explore.
            </ListItem>
            <ListItem>
              This will open the Market Detail Page for that asset.
            </ListItem>
          </OrderedList>
          screenshot
        </div>

        <div>
          <SubTitle>2. Analyze the Charts</SubTitle>
          <Paragraph>
            On the Market Detail Page, you’ll see a real-time price chart
            powered by TradingView. Use this to spot trends and patterns.
          </Paragraph>
          <UnorderedList>
            <ListItem>
              Zoom in and out to analyze different timeframes.
            </ListItem>
            <ListItem>
              Hover over the chart to see specific price points.
            </ListItem>
          </UnorderedList>
          screenshot
        </div>

        <div>
          <SubTitle>3. Use the Buy/Sell Panel</SubTitle>
          <Paragraph>
            On the Market Detail Page, you’ll find the Buy/Sell Panel. Use this
            to simulate trades for the selected asset.
          </Paragraph>
          <OrderedList>
            <ListItem>Choose whether you want to Buy or Sell.</ListItem>
            <ListItem>Enter the amount or price you want to simulate.</ListItem>
            <ListItem>Click the Submit button to confirm the trade.</ListItem>
          </OrderedList>
          screenshot
        </div>

        <div>
          <SubTitle>4. Market Table Infos</SubTitle>
          <Paragraph>
            The Table Infos at the bottom of the Page provides an in-depth look
            at a selected cryptocurrency, including Indodax live transactions,
            your trades history. and crypto news
          </Paragraph>
          <UnorderedList>
            <ListItem>
              <b>Transactions</b> - Displays the live transaction history from
              Indodax for the selected token, showing recent buy and sell
              activity.
            </ListItem>
            <ListItem>
              <b>My Trades</b> - A personal history of your trades for this
              token, so you can track your activity.
            </ListItem>
            <ListItem>
              <b>News</b> - The latest news related to the selected
              cryptocurrency to keep you updated on important events.
            </ListItem>
          </UnorderedList>
          screenshot
        </div>
      </section>

      <section id="what-next" className="mt-5">
        <SectionTitle>🎯 What’s Next?</SectionTitle>
        <Paragraph>
          You’ve now explored the Market Overview! Here’s where to go next:
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/trading-guide">
            Learn how to simulate trades step-by-step
          </LinkItem>
          <LinkItem link="/portfolio">
            Check out your portfolio and track performance
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default MarketOverviewPage;
