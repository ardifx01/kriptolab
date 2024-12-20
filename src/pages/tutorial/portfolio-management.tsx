import React from "react";
import { Trans, useTranslation } from "react-i18next";

import {
  BarChartIcon,
  ChartLineIcon,
  SearchIcon,
  WalletIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const PortfolioManagementPage = () => {
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title={t("portfolioManagement.pageTitle")}>
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="portfolioManagement.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="portfolioManagement.introduction"
            components={{
              b: <b />,
            }}
          />
        </Paragraph>
      </section>

      <section id="idr-balance" className="mt-5">
        <SectionTitle>
          <WalletIcon /> {t("portfolioManagement.idrBalance.title")}
        </SectionTitle>
        <Paragraph>{t("portfolioManagement.idrBalance.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.idrBalance.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.idrBalance.step2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.idrBalance.step3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.idrBalance.step4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("portfolioManagement.idrBalance.summary")}</Paragraph>
      </section>

      <section id="asset-chart" className="mt-5">
        <SectionTitle>
          <ChartLineIcon /> {t("portfolioManagement.assetChart.title")}
        </SectionTitle>
        <Paragraph>{t("portfolioManagement.assetChart.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.assetChart.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.assetChart.step2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("portfolioManagement.assetChart.step3")}</ListItem>
          <ListItem>{t("portfolioManagement.assetChart.step4")}</ListItem>
        </OrderedList>
        <Paragraph>{t("portfolioManagement.assetChart.summary")}</Paragraph>
      </section>

      <section id="asset-list" className="mt-5">
        <SectionTitle>
          <BarChartIcon /> {t("portfolioManagement.assetList.title")}
        </SectionTitle>
        <Paragraph>{t("portfolioManagement.assetList.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="portfolioManagement.assetList.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("portfolioManagement.assetList.step2")}
            <UnorderedList>
              <ListItem>{t("portfolioManagement.assetList.field1")}</ListItem>
              <ListItem>{t("portfolioManagement.assetList.field2")}</ListItem>
              <ListItem>{t("portfolioManagement.assetList.field3")}</ListItem>
              <ListItem>{t("portfolioManagement.assetList.field4")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>{t("portfolioManagement.assetList.step3")}</ListItem>
          <ListItem>{t("portfolioManagement.assetList.step4")}</ListItem>
        </OrderedList>
        <Paragraph>{t("portfolioManagement.assetList.summary")}</Paragraph>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <SearchIcon /> {t("portfolioManagement.summary.title")}
        </SectionTitle>
        <Paragraph>{t("portfolioManagement.summary.description")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/trading-guide">
            {t("portfolioManagement.summary.link1")}
          </LinkItem>
          <LinkItem link="/marketplace">
            {t("portfolioManagement.summary.link2")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default PortfolioManagementPage;
