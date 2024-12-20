import React from "react";
import { Trans, useTranslation } from "react-i18next";

import {
  ArrowRightLeftIcon,
  DollarSignIcon,
  LineChartIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const TradingGuidePage = () => {
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title="Trading Guide">
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="tradingGuide.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="tradingGuide.introduction"
            components={{ b: <b /> }}
          />
        </Paragraph>
      </section>

      <section id="deposit-idr" className="mt-5">
        <SectionTitle>
          <DollarSignIcon /> {t("tradingGuide.depositTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.depositDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.depositStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.depositStep2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("tradingGuide.depositStep3")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.depositStep4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("tradingGuide.depositNote")}</Paragraph>
      </section>

      <section id="select-pair" className="mt-5">
        <SectionTitle>
          <LineChartIcon /> {t("tradingGuide.selectPairTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.selectPairDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.selectPairStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.selectPairStep2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.selectPairStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
      </section>

      <section id="buy-token" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> {t("tradingGuide.buyTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.buyDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.buyStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("tradingGuide.buyStep2")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.buyStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.buyStep4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("tradingGuide.buyNote")}</Paragraph>
      </section>

      <section id="sell-token" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> {t("tradingGuide.sellTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.sellDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.sellStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("tradingGuide.sellStep2")}</ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.sellStep3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.sellStep4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </OrderedList>
        <Paragraph>{t("tradingGuide.sellNote")}</Paragraph>
      </section>

      <section id="check-portfolio" className="mt-5">
        <SectionTitle>
          <LineChartIcon /> {t("tradingGuide.portfolioTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.portfolioDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="tradingGuide.portfolioStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>{t("tradingGuide.portfolioStep2")}</ListItem>
          <ListItem>{t("tradingGuide.portfolioStep3")}</ListItem>
        </OrderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <ArrowRightLeftIcon /> {t("tradingGuide.summaryTitle")}
        </SectionTitle>
        <Paragraph>{t("tradingGuide.summaryDesc")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/market-overview">
            {t("tradingGuide.summaryLink1")}
          </LinkItem>
          <LinkItem link="/portfolio">
            {t("tradingGuide.summaryLink2")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default TradingGuidePage;
