import React from "react";

import { LockKeyholeOpenIcon, NotebookPenIcon, RocketIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const GettingStartedPage = () => {
  return (
    <TutorialLayout title="Getting Started Guide">
      <MainTitle>
        Welcome to <span className="text-primaryAccent">KriptoLab</span>!
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          KriptoLab is a beginner-friendly <b>Crypto Trading Simulator</b> that
          allows you to practice trading using real market data from{" "}
          <b>Indodax</b> without any financial risk.
        </Paragraph>
        <Paragraph>
          This guide will walk you through setting up your account and getting
          started. By the end of this tutorial, you'll be able to:
        </Paragraph>
        <UnorderedList>
          <LinkItem link="#create-your-account">Create Your Account</LinkItem>
          <LinkItem link="#login-to-your-account">
            Log into the Platform
          </LinkItem>
          <LinkItem link="#explore-kriptolab">
            Begin Your Trading Journey
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="create-your-account" className="mt-5">
        <SectionTitle>
          <NotebookPenIcon /> Creating Your Account
        </SectionTitle>
        <Paragraph>
          Start your KriptoLab journey by creating a free account to save your
          progress and begin trading.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Go to the KriptoLab website and locate the <b>Register</b> button in
            the top-right corner.
          </ListItem>
          <ListItem>
            Fill out the registration form with:
            <UnorderedList>
              <ListItem>Your full name</ListItem>
              <ListItem>A valid email address</ListItem>
              <ListItem>
                A secure password (minimum 8 characters, including uppercase,
                lowercase, numbers, and special characters)
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Click the <b>Create Account</b> button to complete registration.
          </ListItem>
        </OrderedList>

        <Paragraph className="mt-3">Alternative Registration Method:</Paragraph>
        <OrderedList>
          <ListItem>
            Click the <b>Continue with Google</b> button.
          </ListItem>
          <ListItem>Select the Google account you want to use.</ListItem>
          <ListItem>
            Follow the prompted steps to complete your registration.
          </ListItem>
        </OrderedList>
      </section>

      <section id="login-to-your-account" className="mt-5">
        <SectionTitle>
          <LockKeyholeOpenIcon /> Logging Into Your Account
        </SectionTitle>
        <Paragraph>
          Access your KriptoLab account and start your trading simulation.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Click the <b>Login</b> button in the top-right corner.
          </ListItem>
          <ListItem>Enter your registered email and password.</ListItem>
          <ListItem>
            Click the <b>Login</b> button to access your account.
          </ListItem>
        </OrderedList>

        <Paragraph className="mt-3">
          Forgot Your Password? Follow these steps:
        </Paragraph>
        <OrderedList>
          <ListItem>
            On the login page, click the <b>Forgot Password</b> link.
          </ListItem>
          <ListItem>Enter your registered email address.</ListItem>
          <ListItem>
            Click <b>Send Reset Link</b>.
          </ListItem>
          <ListItem>
            Check your email inbox (including spam folder) for the reset link.
          </ListItem>
          <ListItem>Click the reset link and create a new password.</ListItem>
        </OrderedList>
      </section>

      <section id="explore-kriptolab" className="mt-5">
        <SectionTitle>
          <RocketIcon /> Start Your Trading Journey
        </SectionTitle>
        <Paragraph>
          Now that you're set up, explore KriptoLab and begin your crypto
          trading simulation.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/market-overview">
            Learn How to Use KriptoLab
          </LinkItem>
          <LinkItem link="/market">
            Start Trading with Real Market Data
          </LinkItem>
          <LinkItem link="/tutorial/trading-guide">
            Explore Trading Guide
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default GettingStartedPage;
