import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { AlertTriangleIcon, KeyIcon, LockIcon, ShieldIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const AccountManagementPage: React.FC = () => {
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title={t("accountManagement.pageTitle")}>
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="accountManagement.title"
          components={{ span: <span className="text-primaryAccent" /> }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="accountManagement.introduction"
            components={{ b: <b /> }}
          />
        </Paragraph>
      </section>

      <section id="password-change" className="mt-5">
        <SectionTitle>
          <KeyIcon /> {t("accountManagement.passwordChange.title")}
        </SectionTitle>
        <Paragraph>
          {t("accountManagement.passwordChange.description")}
        </Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="accountManagement.passwordChange.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {" "}
            <Trans
              ns="tutorial"
              i18nKey="accountManagement.passwordChange.step2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("accountManagement.passwordChange.step3")}
            <UnorderedList>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="accountManagement.passwordChange.currentPassword"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="accountManagement.passwordChange.newPassword"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="accountManagement.passwordChange.confirmPassword"
                  components={{ b: <b /> }}
                />
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="accountManagement.passwordChange.step4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
      </section>

      <section id="password-guidelines" className="mt-5">
        <SectionTitle>
          <ShieldIcon /> {t("accountManagement.passwordGuidelines.title")}
        </SectionTitle>
        <Paragraph>
          {t("accountManagement.passwordGuidelines.description")}
        </Paragraph>
        <UnorderedList>
          <ListItem>{t("accountManagement.passwordGuidelines.tip1")}</ListItem>
          <ListItem>{t("accountManagement.passwordGuidelines.tip2")}</ListItem>
          <ListItem>{t("accountManagement.passwordGuidelines.tip3")}</ListItem>
          <ListItem>{t("accountManagement.passwordGuidelines.tip4")}</ListItem>
          <ListItem>{t("accountManagement.passwordGuidelines.tip5")}</ListItem>
        </UnorderedList>
      </section>

      <section id="security-warnings" className="mt-5">
        <SectionTitle>
          <AlertTriangleIcon /> {t("accountManagement.securityWarnings.title")}
        </SectionTitle>
        <Paragraph>
          {t("accountManagement.securityWarnings.description")}
        </Paragraph>
        <UnorderedList>
          <ListItem>{t("accountManagement.securityWarnings.tip1")}</ListItem>
          <ListItem>{t("accountManagement.securityWarnings.tip2")}</ListItem>
          <ListItem>{t("accountManagement.securityWarnings.tip3")}</ListItem>
          <ListItem>{t("accountManagement.securityWarnings.tip4")}</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <LockIcon /> {t("accountManagement.summary.title")}
        </SectionTitle>
        <Paragraph>{t("accountManagement.summary.description")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/account-settings">
            {t("accountManagement.summary.link1")}
          </LinkItem>
          <LinkItem link="/tutorial/customize-profile">
            {t("accountManagement.summary.link2")}
          </LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            {t("accountManagement.summary.link3")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default AccountManagementPage;
