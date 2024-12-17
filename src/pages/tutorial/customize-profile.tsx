import React from "react";

import { CameraIcon, EditIcon, ImageIcon, UserIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const ProfileCustomizationPage = () => {
  return (
    <TutorialLayout title="Profile Customization Guide">
      <MainTitle>
        Personalize Your <span className="text-primaryAccent">Profile</span> in
        KriptoLab
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          Learn how to <b>customize your profile</b> and make KriptoLab truly
          yours. Personalize your account with a unique avatar and update your
          personal information.
        </Paragraph>
      </section>

      <section id="profile-avatar" className="mt-5">
        <SectionTitle>
          <CameraIcon /> Changing Your Profile Picture
        </SectionTitle>
        <Paragraph>
          Personalize your profile by uploading a custom avatar.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Navigate to the <b>Profile Settings</b> page.
          </ListItem>
          <ListItem>
            Locate the <b>Profile Picture</b> section.
          </ListItem>
          <ListItem>
            Click the <b>Upload Avatar</b> button.
          </ListItem>
          <ListItem>
            Select an image from your device (recommended: square format, max
            5MB).
          </ListItem>
          <ListItem>
            Click <b>Save Changes</b> to update your profile picture.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Your new avatar will be displayed across the KriptoLab platform.
        </Paragraph>
      </section>

      <section id="personal-information" className="mt-5">
        <SectionTitle>
          <UserIcon /> Editing Personal Details
        </SectionTitle>
        <Paragraph>
          Keep your personal information up-to-date in your profile settings.
        </Paragraph>
        <OrderedList>
          <ListItem>
            Go to the <b>Profile Settings</b> page.
          </ListItem>
          <ListItem>
            Find the <b>Personal Information</b> section.
          </ListItem>
          <ListItem>
            You can edit the following details:
            <UnorderedList>
              <ListItem>
                <b>First Name</b>
              </ListItem>
              <ListItem>
                <b>Last Name</b>
              </ListItem>
              <ListItem>
                <b>Phone Number</b>
              </ListItem>
              <ListItem>
                <b>Address</b>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Edit the fields you wish to update.</ListItem>
          <ListItem>
            Note: <b>Email</b> is read-only and cannot be changed.
          </ListItem>
          <ListItem>
            Click the <b>Save Changes</b> button to update your profile.
          </ListItem>
        </OrderedList>
        <Paragraph>
          Keeping your profile accurate helps with account security and
          personalization.
        </Paragraph>
      </section>

      <section id="profile-tips" className="mt-5">
        <SectionTitle>
          <EditIcon /> Profile Customization Tips
        </SectionTitle>
        <Paragraph>
          Maximize your KriptoLab profile experience with these recommendations:
        </Paragraph>
        <UnorderedList>
          <ListItem>Use a clear, recognizable profile picture</ListItem>
          <ListItem>Keep your contact information current</ListItem>
          <ListItem>
            Ensure your phone number is accurate for account recovery
          </ListItem>
          <ListItem>Review and update your profile periodically</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <ImageIcon /> Your Profile, Your Identity
        </SectionTitle>
        <Paragraph>
          You're now equipped to personalize and manage your KriptoLab profile.
        </Paragraph>
        <UnorderedList>
          <LinkItem link="/profile">Go to Profile Settings</LinkItem>
          <LinkItem link="/tutorial/account-management">
            Learn About Account Management
          </LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            Explore Portfolio Management
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default ProfileCustomizationPage;
