import React from "react";

import { AlertTriangleIcon, KeyIcon, LockIcon, ShieldIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const AccountManagementPage = () => {
  return (
    <TutorialLayout title="Account Management Guide">
      <MainTitle>
        Secure Your <span className="text-primaryAccent">Account</span> in
        KriptoLab
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          Learn how to <b>manage and secure</b> your KriptoLab account by
          changing your password and maintaining account safety.
        </Paragraph>
      </section>

      <section id="password-change" className="mt-5">
        <SectionTitle>
          <KeyIcon /> Changing Your Password
        </SectionTitle>
        <Paragraph>
          Regularly updating your password helps protect your account from
          unauthorized access.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Account Settings</b> page.
          </ListItem>
          <ListItem>
            Locate the <b>Change Password</b> section.
          </ListItem>
          <ListItem>
            Fill in the following fields:
            <UnorderedList>
              <ListItem>
                <b>Current Password:</b> Enter your existing password
              </ListItem>
              <ListItem>
                <b>New Password:</b> Choose a strong, unique password
              </ListItem>
              <ListItem>
                <b>Confirm New Password:</b> Re-enter the new password
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            Click the <b>Edit Password</b> button to update your password.
          </ListItem>
        </OrderedList>
      </section>

      <section id="password-guidelines" className="mt-5">
        <SectionTitle>
          <ShieldIcon /> Password Security Tips
        </SectionTitle>
        <Paragraph>
          Create a strong password to protect your KriptoLab account:
        </Paragraph>
        <UnorderedList>
          <ListItem>Use at least 12 characters</ListItem>
          <ListItem>Combine uppercase and lowercase letters</ListItem>
          <ListItem>Include numbers and special characters</ListItem>
          <ListItem>Avoid using personal information or common words</ListItem>
          <ListItem>Use a unique password not used on other platforms</ListItem>
        </UnorderedList>
      </section>

      <section id="security-warnings" className="mt-5">
        <SectionTitle>
          <AlertTriangleIcon /> Important Security Reminders
        </SectionTitle>
        <Paragraph>
          Protect your account with these crucial security practices:
        </Paragraph>
        <UnorderedList>
          <ListItem>Never share your password with anyone</ListItem>
          <ListItem>Be cautious of phishing attempts</ListItem>
          <ListItem>Use two-factor authentication if available</ListItem>
          <ListItem>Log out from shared or public devices</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <LockIcon /> Secure Your Digital Journey
        </SectionTitle>
        <Paragraph>
          You're now equipped to manage and secure your KriptoLab account.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/account-settings">Go to Account Settings</LinkItem>
          <LinkItem link="/tutorial/customize-profile">
            Customize Your Profile
          </LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            Manage Your Portfolio
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default AccountManagementPage;
