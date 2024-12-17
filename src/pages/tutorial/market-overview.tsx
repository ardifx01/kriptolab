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

const MarketOverviewPage = () => {
  return (
    <TutorialLayout title="Market Overview Guide">
      <MainTitle>
        Explore the <span className="text-primaryAccent">Market Overview</span>
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          The Market Overview is the central hub of KriptoLab, providing live
          cryptocurrency prices, trending assets, and comprehensive market
          insights to help you make informed trading decisions.
        </Paragraph>
        <Paragraph>In this tutorial, you'll learn how to:</Paragraph>
        <UnorderedList>
          <LinkItem link="#market-listings">View Live Market Listings</LinkItem>
          <LinkItem link="#market-filters">
            Filter and Search Crypto Assets
          </LinkItem>
          <LinkItem link="#market-details">
            Navigate the Market Detail Page
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="market-listings" className="mt-5">
        <SectionTitle>
          <BarChart2Icon /> Live Market Listings
        </SectionTitle>
        <Paragraph>
          The Market Listings table provides comprehensive real-time data for
          all supported cryptocurrency assets.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Market</b> page from the main navigation menu.
          </ListItem>
          <ListItem>
            Explore the Market Listings Table with key information about crypto
            assets:
            <UnorderedList>
              <ListItem>
                <b>Token Name:</b> Cryptocurrency name (e.g., Bitcoin, Ethereum)
              </ListItem>
              <ListItem>
                <b>Token Pair:</b> Available trading pairs (e.g., BTC/IDR,
                ETH/IDR)
              </ListItem>
              <ListItem>
                <b>Price:</b> Current market price
              </ListItem>
              <ListItem>
                <b>24h Volume:</b> Total trading volume in last 24 hours
              </ListItem>
              <ListItem>
                <b>24h Change:</b> Price percentage change in 24 hours
              </ListItem>
              <ListItem>
                <b>7d Change:</b> Price percentage change in 7 days
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="market-filters" className="mt-5">
        <SectionTitle>
          <TrendingUpIcon /> Finding Your Crypto Assets
        </SectionTitle>
        <Paragraph>
          Easily locate and explore cryptocurrencies using KriptoLab's advanced
          filtering tools.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Use the <b>Search Bar</b> to find specific cryptocurrencies:
            <UnorderedList>
              <ListItem>
                Located at the top of the Market Listings Table
              </ListItem>
              <ListItem>Enter a token name or ticker (e.g., BTC)</ListItem>
              <ListItem>Table updates to show matching results</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Utilize the <b>Trending</b> filter:
            <UnorderedList>
              <ListItem>Click the "Trending" button above the table</ListItem>
              <ListItem>View top-performing and most popular assets</ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="market-details" className="mt-5">
        <SectionTitle>
          <WalletIcon /> Exploring the Market Detail Page
        </SectionTitle>
        <Paragraph>
          The Market Detail Page offers in-depth analysis and trading simulation
          for each cryptocurrency.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Open the Market Detail Page:
            <UnorderedList>
              <ListItem>
                Click on any cryptocurrency in the Market Listings Table
              </ListItem>
              <ListItem>
                Access comprehensive information for the selected asset
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Analyze TradingView Price Charts:
            <UnorderedList>
              <ListItem>Zoom in/out to examine different timeframes</ListItem>
              <ListItem>
                Hover over chart points for precise price details
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Use the Buy/Sell Panel:
            <UnorderedList>
              <ListItem>Select Buy or Sell action</ListItem>
              <ListItem>Enter trade amount or price</ListItem>
              <ListItem>Confirm simulated trade</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Explore Additional Market Information:
            <UnorderedList>
              <ListItem>
                <b>Transactions:</b> Live trading history from Indodax
              </ListItem>
              <ListItem>
                <b>My Trades:</b> Your personal trading history
              </ListItem>
              <ListItem>
                <b>News:</b> Latest cryptocurrency-related updates
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="what-next" className="mt-5">
        <SectionTitle>Next Steps in Your Trading Journey</SectionTitle>
        <Paragraph>
          You've now mastered the Market Overview! Continue exploring KriptoLab:
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/trading-guide">
            Learn How to Simulate Trades
          </LinkItem>
          <LinkItem link="/portfolio">
            Track Your Portfolio Performance
          </LinkItem>
          <LinkItem link="/tutorial/track-transactions">
            Understand Transaction Monitoring
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default MarketOverviewPage;
