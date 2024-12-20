import React from "react";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title="Getting Started Guide">
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="gettingStarted.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="gettingStarted.introduction1"
            components={{
              b: <b />,
            }}
          />
        </Paragraph>
        <Paragraph>{t("gettingStarted.introduction2")}</Paragraph>
        <UnorderedList>
          <LinkItem link="#create-your-account">
            {t("gettingStarted.createAccountTitle")}
          </LinkItem>
          <LinkItem link="#login-to-your-account">
            {t("gettingStarted.loginTitle")}
          </LinkItem>
          <LinkItem link="#explore-kriptolab">
            {t("gettingStarted.exploreTitle")}
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="create-your-account" className="mt-5">
        <SectionTitle>
          <NotebookPenIcon /> {t("gettingStarted.createAccountTitle")}
        </SectionTitle>
        <Paragraph>{t("gettingStarted.createAccountDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.createAccountStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("gettingStarted.createAccountStep2")}
            <UnorderedList>
              <ListItem>{t("gettingStarted.createAccountField1")}</ListItem>
              <ListItem>{t("gettingStarted.createAccountField2")}</ListItem>
              <ListItem>{t("gettingStarted.createAccountField3")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.createAccountStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>

        <Paragraph className="mt-3">
          {t("gettingStarted.alternativeTitle")}
        </Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.alternativeStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("gettingStarted.alternativeStep2")}</ListItem>
          <ListItem>{t("gettingStarted.alternativeStep3")}</ListItem>
        </OrderedList>
      </section>

      <section id="login-to-your-account" className="mt-5">
        <SectionTitle>
          <LockKeyholeOpenIcon /> {t("gettingStarted.loginTitle")}
        </SectionTitle>
        <Paragraph>{t("gettingStarted.loginDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.loginStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("gettingStarted.loginStep2")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.loginStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>

        <Paragraph className="mt-3">
          {t("gettingStarted.forgotPasswordTitle")}
        </Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.forgotStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("gettingStarted.forgotStep2")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="gettingStarted.forgotStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("gettingStarted.forgotStep4")}</ListItem>
          <ListItem>{t("gettingStarted.forgotStep5")}</ListItem>
        </OrderedList>
      </section>

      <section id="explore-kriptolab" className="mt-5">
        <SectionTitle>
          <RocketIcon /> {t("gettingStarted.exploreTitle")}
        </SectionTitle>
        <Paragraph>{t("gettingStarted.exploreDesc")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/market-overview">
            {t("gettingStarted.exploreLink1")}
          </LinkItem>
          <LinkItem link="/market">{t("gettingStarted.exploreLink2")}</LinkItem>
          <LinkItem link="/tutorial/trading-guide">
            {t("gettingStarted.exploreLink3")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default GettingStartedPage;
