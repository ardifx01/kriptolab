import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { BarChart2Icon, TrendingUpIcon, WalletIcon } from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const MarketOverviewPage = () => {
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title="Market Overview Guide">
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="marketOverview.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>{t("marketOverview.introduction1")}</Paragraph>
        <Paragraph>{t("marketOverview.introduction2")}</Paragraph>
        <UnorderedList>
          <LinkItem link="#market-listings">
            {t("marketOverview.marketListingsLink")}
          </LinkItem>
          <LinkItem link="#market-filters">
            {t("marketOverview.marketFiltersLink")}
          </LinkItem>
          <LinkItem link="#market-details">
            {t("marketOverview.marketDetailsLink")}
          </LinkItem>
        </UnorderedList>
      </section>

      <section id="market-listings" className="mt-5">
        <SectionTitle>
          <BarChart2Icon /> {t("marketOverview.listingsTitle")}
        </SectionTitle>
        <Paragraph>{t("marketOverview.listingsDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="marketOverview.listingsStep1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("marketOverview.listingsStep2")}
            <UnorderedList>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField1"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField2"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField3"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField4"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField5"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.listingsField6"
                  components={{ b: <b /> }}
                />
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="market-filters" className="mt-5">
        <SectionTitle>
          <TrendingUpIcon /> {t("marketOverview.filtersTitle")}
        </SectionTitle>
        <Paragraph>{t("marketOverview.filtersDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="marketOverview.filtersStep1"
              components={{ b: <b /> }}
            />
            <UnorderedList>
              <ListItem>{t("marketOverview.filtersField1")}</ListItem>
              <ListItem>{t("marketOverview.filtersField2")}</ListItem>
              <ListItem>{t("marketOverview.filtersField3")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="marketOverview.filtersStep2"
              components={{ b: <b /> }}
            />
            <UnorderedList>
              <ListItem>{t("marketOverview.filtersField4")}</ListItem>
              <ListItem>{t("marketOverview.filtersField5")}</ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="market-details" className="mt-5">
        <SectionTitle>
          <WalletIcon /> {t("marketOverview.detailsTitle")}
        </SectionTitle>
        <Paragraph>{t("marketOverview.detailsDesc")}</Paragraph>
        <OrderedList>
          <ListItem>
            {t("marketOverview.detailsStep1")}
            <UnorderedList>
              <ListItem>{t("marketOverview.detailsField1")}</ListItem>
              <ListItem>{t("marketOverview.detailsField2")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            {t("marketOverview.detailsStep2")}
            <UnorderedList>
              <ListItem>{t("marketOverview.detailsField3")}</ListItem>
              <ListItem>{t("marketOverview.detailsField4")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            {t("marketOverview.detailsStep3")}
            <UnorderedList>
              <ListItem>{t("marketOverview.detailsField5")}</ListItem>
              <ListItem>{t("marketOverview.detailsField6")}</ListItem>
              <ListItem>{t("marketOverview.detailsField7")}</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            {t("marketOverview.detailsStep4")}
            <UnorderedList>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.detailsField8"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.detailsField9"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="marketOverview.detailsField10"
                  components={{ b: <b /> }}
                />
              </ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
      </section>

      <section id="what-next" className="mt-5">
        <SectionTitle>{t("marketOverview.nextStepsTitle")}</SectionTitle>
        <Paragraph>{t("marketOverview.nextStepsDesc")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/tutorial/trading-guide">
            {t("marketOverview.nextStepsLink1")}
          </LinkItem>
          <LinkItem link="/portfolio">
            {t("marketOverview.nextStepsLink2")}
          </LinkItem>
          <LinkItem link="/tutorial/track-transactions">
            {t("marketOverview.nextStepsLink3")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default MarketOverviewPage;
