import React from "react";
import { Trans, useTranslation } from "react-i18next";

import {
  ActivityIcon,
  ClipboardListIcon,
  FilterIcon,
  ListIcon,
  SearchIcon,
} from "lucide-react";

import LinkItem from "@/features/tutorial/components/Lists/LinkItem";
import ListItem from "@/features/tutorial/components/Lists/ListItem";
import OrderedList from "@/features/tutorial/components/Lists/OrderedList";
import UnorderedList from "@/features/tutorial/components/Lists/UnorderedList";
import TutorialLayout from "@/features/tutorial/components/TutorialLayout/TutorialLayout";
import MainTitle from "@/features/tutorial/components/Typography/MainTitle";
import Paragraph from "@/features/tutorial/components/Typography/Paragraph";
import SectionTitle from "@/features/tutorial/components/Typography/SectionTitle";

const TransactionsMonitoringPage = () => {
  const { t } = useTranslation("tutorial");

  return (
    <TutorialLayout title={t("transactionsMonitoring.pageTitle")}>
      <MainTitle>
        <Trans
          ns="tutorial"
          i18nKey="transactionsMonitoring.title"
          components={{
            span: <span className="text-primaryAccent" />,
          }}
        />
      </MainTitle>

      <section id="introduction">
        <Paragraph>
          <Trans
            ns="tutorial"
            i18nKey="transactionsMonitoring.introduction"
            components={{
              b: <b />,
            }}
          />
        </Paragraph>
      </section>

      <section id="transaction-types" className="mt-5">
        <SectionTitle>
          <ListIcon /> {t("transactionsMonitoring.types.title")}
        </SectionTitle>
        <Paragraph>{t("transactionsMonitoring.types.description")}</Paragraph>
        <UnorderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="transactionsMonitoring.types.type1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="transactionsMonitoring.types.type2"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="transactionsMonitoring.types.type3"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="transactionsMonitoring.types.type4"
              components={{ b: <b /> }}
            />
          </ListItem>
        </UnorderedList>
        <Paragraph>{t("transactionsMonitoring.types.summary")}</Paragraph>
      </section>

      <section id="transaction-table" className="mt-5">
        <SectionTitle>
          <ClipboardListIcon /> {t("transactionsMonitoring.table.title")}
        </SectionTitle>
        <Paragraph>{t("transactionsMonitoring.table.description")}</Paragraph>
        <OrderedList>
          <ListItem>
            <Trans
              ns="tutorial"
              i18nKey="transactionsMonitoring.table.step1"
              components={{ b: <b /> }}
            />
          </ListItem>
          <ListItem>
            {t("transactionsMonitoring.table.step2")}
            <UnorderedList>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="transactionsMonitoring.table.field1"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="transactionsMonitoring.table.field2"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="transactionsMonitoring.table.field3"
                  components={{ b: <b /> }}
                />
              </ListItem>
              <ListItem>
                <Trans
                  ns="tutorial"
                  i18nKey="transactionsMonitoring.table.field4"
                  components={{ b: <b /> }}
                />
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>{t("transactionsMonitoring.table.step3")}</ListItem>
        </OrderedList>
      </section>

      <section id="filtering" className="mt-5">
        <SectionTitle>
          <FilterIcon /> {t("transactionsMonitoring.filtering.title")}
        </SectionTitle>
        <Paragraph>
          {t("transactionsMonitoring.filtering.description")}
        </Paragraph>
        <OrderedList>
          <ListItem>
            {t("transactionsMonitoring.filtering.step1")}
            <UnorderedList>
              <ListItem>
                {t("transactionsMonitoring.filtering.filter1")}
              </ListItem>
              <ListItem>
                {t("transactionsMonitoring.filtering.filter2")}
              </ListItem>
              <ListItem>
                {t("transactionsMonitoring.filtering.filter3")}
              </ListItem>
              <ListItem>
                {t("transactionsMonitoring.filtering.filter4")}
              </ListItem>
              <ListItem>
                {t("transactionsMonitoring.filtering.filter5")}
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>{t("transactionsMonitoring.filtering.step2")}</ListItem>
          <ListItem>{t("transactionsMonitoring.filtering.step3")}</ListItem>
        </OrderedList>
        <Paragraph>{t("transactionsMonitoring.filtering.summary")}</Paragraph>
      </section>

      <section id="transaction-insights" className="mt-5">
        <SectionTitle>
          <ActivityIcon /> {t("transactionsMonitoring.insights.title")}
        </SectionTitle>
        <Paragraph>
          {t("transactionsMonitoring.insights.description")}
        </Paragraph>
        <UnorderedList>
          <ListItem>{t("transactionsMonitoring.insights.point1")}</ListItem>
          <ListItem>{t("transactionsMonitoring.insights.point2")}</ListItem>
          <ListItem>{t("transactionsMonitoring.insights.point3")}</ListItem>
        </UnorderedList>
      </section>

      <section id="summary" className="mt-5">
        <SectionTitle>
          <SearchIcon /> {t("transactionsMonitoring.summary.title")}
        </SectionTitle>
        <Paragraph>{t("transactionsMonitoring.summary.description")}</Paragraph>
        <UnorderedList>
          <LinkItem link="/transactions">
            {t("transactionsMonitoring.summary.link1")}
          </LinkItem>
          <LinkItem link="/tutorial/portfolio-management">
            {t("transactionsMonitoring.summary.link2")}
          </LinkItem>
          <LinkItem link="/tutorial/trading-guide">
            {t("transactionsMonitoring.summary.link3")}
          </LinkItem>
        </UnorderedList>
      </section>
    </TutorialLayout>
  );
};

export default TransactionsMonitoringPage;
