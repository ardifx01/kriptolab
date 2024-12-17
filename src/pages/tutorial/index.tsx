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
import SubTitle from "@/features/tutorial/components/Typography/SubTitle";

const GettingStartedPage = () => {
  return (
    <TutorialLayout title="Tutorial">
      <MainTitle>
        Welcome to <span className="text-primaryAccent">KriptoLab</span>!
      </MainTitle>
      <section id="introduction">
        <Paragraph>
          KriptoLab is a beginner-friendly <b>Crypto Trading Simulator</b> where
          you can practice trading risk-free using real market data from{" "}
          <b>Indodax!</b>
        </Paragraph>
        <Paragraph>
          If you’re new to crypto, no worries — this step-by-step guide will
          help you get started in no time By the end of this page, you’ll:
        </Paragraph>
        <UnorderedList>
          <LinkItem link="#create-your-account">Create Your Account</LinkItem>
          <LinkItem link="#login-to-your-account">
            Log in to the platform
          </LinkItem>
          <LinkItem link="#explore-kriptolab">
            Understand what's next and where to go
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="create-your-account" className="mt-5">
        <SectionTitle>
          <NotebookPenIcon /> Create Your Account
        </SectionTitle>
        <Paragraph>
          Get started by signing up for KriptoLab so you can save your progress
          and begin trading
        </Paragraph>
        <div>
          <SubTitle className="mt-3">1. Open the Registration Page</SubTitle>
          <Paragraph>
            First, let’s navigate to the registration page to create your
            account
          </Paragraph>
          <OrderedList>
            <ListItem>Go to the KriptoLab website</ListItem>
            <ListItem>
              In the top-right corner of the page, click the "Register" button
            </ListItem>
          </OrderedList>
          screenshot
        </div>
        <div>
          <SubTitle>2. Fill Out the Registration Form</SubTitle>
          <Paragraph>
            Fill in some basic details so we can set up your KriptoLab account
          </Paragraph>
          <OrderedList>
            <ListItem>Enter your name</ListItem>
            <ListItem>Enter your email address</ListItem>
            <ListItem>
              Choose a secure password (at least 8 characters long - keep it
              strong nd secure!)
            </ListItem>
            <ListItem>Click the "Create account" button</ListItem>
          </OrderedList>
          screenshot
        </div>
        <div>
          <SubTitle>3. Sign Up with Google Account (Optional)</SubTitle>
          <Paragraph>
            Prefer skipping forms? Use your Google account to sign up in seconds
          </Paragraph>
          <OrderedList>
            <ListItem>
              On the registration page, click the "Continue with Google" button
            </ListItem>
            <ListItem>
              Follow the prompts to sign in with your Google account
            </ListItem>
          </OrderedList>
          screenshot
        </div>
      </section>

      <section id="login-to-your-account" className="mt-5">
        <SectionTitle>
          <LockKeyholeOpenIcon /> Log In to Your Account
        </SectionTitle>
        <Paragraph>
          Already have an account? Here’s how to log in and start exploring
          KriptoLab
        </Paragraph>
        <div>
          <SubTitle>1. Open the Login Page</SubTitle>
          <Paragraph>
            Log in to access your account and start simulating trades
          </Paragraph>
          <OrderedList>
            <ListItem>
              In the top-right corner, click the "Login" button
            </ListItem>
            <ListItem>
              Enter the Email and Password you used during registration
            </ListItem>
            <ListItem>Click "Login" to access your account</ListItem>
          </OrderedList>
          screenshot
        </div>

        <div>
          <SubTitle>2. Forgot Your Password?</SubTitle>
          <Paragraph>
            No worries! Reset your password in a few easy steps
          </Paragraph>
          <OrderedList>
            <ListItem>
              On the login page, click the "Forgot Password?" link
            </ListItem>
            <ListItem>
              Enter your email address and click "Send Reset Link"
            </ListItem>
            <ListItem>
              Check your inbox (don’t forget to check Spam!) and click the reset
              link
            </ListItem>
            <ListItem>
              Create a new password on the reset page and confirm it
            </ListItem>
            <ListItem>Done! Log in with your new password</ListItem>
          </OrderedList>
          screenshot
        </div>
      </section>

      <section id="explore-kriptolab" className="mt-5">
        <SectionTitle>
          <RocketIcon /> Explore KriptoLab
        </SectionTitle>
        <Paragraph>
          Now that you’re all set up, here’s what you can do next
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/market-overview">
            Learn how to use KriptoLab
          </LinkItem>
          <LinkItem link="/market">
            Start trading with real market data
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default GettingStartedPage;
