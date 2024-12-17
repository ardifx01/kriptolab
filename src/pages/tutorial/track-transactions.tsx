import React from "react";

import {
  ActivityIcon,
  ClipboardListIcon,
  FilterIcon,
  ListIcon,
  SearchIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const TransactionsMonitoringPage = () => {
  return (
    <TutorialLayout title="Transactions Monitoring Guide">
      <MainTitle>
        Monitor Your <span className="text-primaryAccent">Transactions</span> in
        KriptoLab
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          Learn how to <b>track, analyze, and understand</b> all your financial
          activities in KriptoLab's comprehensive transaction monitoring system.
        </Paragraph>
      </section>

      <section id="transaction-types" className="mt-5">
        <SectionTitle>
          <ListIcon /> Understanding Transaction Types
        </SectionTitle>
        <Paragraph>
          KriptoLab tracks four primary types of financial transactions:
        </Paragraph>
        <UnorderedList>
          <ListItem>
            <b>Buy:</b> Purchasing cryptocurrency tokens using your IDR balance
          </ListItem>
          <ListItem>
            <b>Sell:</b> Converting cryptocurrency tokens back to IDR
          </ListItem>
          <ListItem>
            <b>Deposit:</b> Adding funds to your simulated wallet
          </ListItem>
          <ListItem>
            <b>Withdrawal:</b> Removing funds from your simulated wallet
          </ListItem>
        </UnorderedList>
        <Paragraph>
          Each transaction is recorded with detailed information for complete
          transparency.
        </Paragraph>
      </section>

      <section id="transaction-table" className="mt-5">
        <SectionTitle>
          <ClipboardListIcon /> Transaction History Table
        </SectionTitle>
        <Paragraph>
          The Transaction History displays a comprehensive log of all your
          financial activities.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Transactions</b> page to view your complete
            transaction history.
          </ListItem>
          <ListItem>
            The table includes key details for each transaction:
            <UnorderedList>
              <ListItem>
                <b>Date:</b> Exact timestamp of the transaction
              </ListItem>
              <ListItem>
                <b>Type:</b> Buy, Sell, Deposit, or Withdrawal
              </ListItem>
              <ListItem>
                <b>Price:</b> Value of the transaction at the time
              </ListItem>
              <ListItem>
                <b>Amount:</b> Quantity of tokens or IDR involved
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Transactions are typically sorted from most recent to oldest by
            default.
          </ListItem>
        </OrderedList>
      </section>

      <section id="filtering" className="mt-5">
        <SectionTitle>
          <FilterIcon /> Filtering Your Transactions
        </SectionTitle>
        <Paragraph>
          Quickly find specific transactions using advanced filtering options.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Use transaction type filter buttons to view specific transaction
            categories:
            <UnorderedList>
              <ListItem>All Transactions</ListItem>
              <ListItem>Buy</ListItem>
              <ListItem>Sell</ListItem>
              <ListItem>Deposit</ListItem>
              <ListItem>Withdrawal</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Click on the desired filter button to instantly update the
            transaction view.
          </ListItem>
          <ListItem>
            Combine filters to create precise views of your transaction history.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Filtering helps you understand your trading and financial patterns
          quickly.
        </Paragraph>
      </section>

      <section id="transaction-insights" className="mt-5">
        <SectionTitle>
          <ActivityIcon /> Gaining Transaction Insights
        </SectionTitle>
        <Paragraph>
          Your transaction history is more than just a log—it's a valuable tool
          for understanding your financial activity.
        </Paragraph>
        <UnorderedList>
          <ListItem>
            Use transaction data to track your trading performance
          </ListItem>
          <ListItem>Analyze spending and investment patterns</ListItem>
          <ListItem>Understand your portfolio's movement and growth</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <SearchIcon /> Explore Your Transaction History!
        </SectionTitle>
        <Paragraph>
          You're now equipped to navigate and understand your transaction
          history in KriptoLab.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/transactions">View Transaction History</LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            Learn About Portfolio Management
          </LinkItem>
          <LinkItem link="/tutorial/trading-guide">
            Revisit Trading Guide
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default TransactionsMonitoringPage;
