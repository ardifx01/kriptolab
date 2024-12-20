import React from "react";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title={t("profileCustomization.pageTitle")}>
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="profileCustomization.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="profileCustomization.introduction"
            components={{
              b: <b />,
            }}
          />
        </Paragraph>
      </section>

      <section id="profile-avatar" className="mt-5">
        <SectionTitle>
          <CameraIcon /> {t("profileCustomization.avatar.title")}
        </SectionTitle>
        <Paragraph>{t("profileCustomization.avatar.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.avatar.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.avatar.step2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.avatar.step3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("profileCustomization.avatar.step4")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.avatar.step5"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("profileCustomization.avatar.summary")}</Paragraph>
      </section>

      <section id="personal-information" className="mt-5">
        <SectionTitle>
          <UserIcon /> {t("profileCustomization.personal.title")}
        </SectionTitle>
        <Paragraph>{t("profileCustomization.personal.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.personal.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.personal.step2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("profileCustomization.personal.step3")}
            <UnorderedList>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="profileCustomization.personal.field1"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="profileCustomization.personal.field2"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="profileCustomization.personal.field3"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="profileCustomization.personal.field4"
                  components={{ b: <b /> }}
                />
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>{t("profileCustomization.personal.step4")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.personal.step5"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="profileCustomization.personal.step6"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("profileCustomization.personal.summary")}</Paragraph>
      </section>

      <section id="profile-tips" className="mt-5">
        <SectionTitle>
          <EditIcon /> {t("profileCustomization.tips.title")}
        </SectionTitle>
        <Paragraph>{t("profileCustomization.tips.description")}</Paragraph>
        <UnorderedList>
          <ListItem>{t("profileCustomization.tips.tip1")}</ListItem>
          <ListItem>{t("profileCustomization.tips.tip2")}</ListItem>
          <ListItem>{t("profileCustomization.tips.tip3")}</ListItem>
          <ListItem>{t("profileCustomization.tips.tip4")}</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <ImageIcon /> {t("profileCustomization.summary.title")}
        </SectionTitle>
        <Paragraph>{t("profileCustomization.summary.description")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/profile">
            {t("profileCustomization.summary.link1")}
          </LinkItem>
          <LinkItem link="/tutorial/account-management">
            {t("profileCustomization.summary.link2")}
          </LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            {t("profileCustomization.summary.link3")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default ProfileCustomizationPage;
