import { useTranslation } from "react-i18next";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import FeatureSection, {
  FeatureSectionProps,
} from "@/components/FeatureSection/FeatureSection";
import Layout from "@/components/Layout/Layout";
import Shimmer from "@/components/Loader/Shimmer";
import CustomTable from "@/components/Table/TableCustom";
import { ColumnType } from "@/components/Table/types";
import useTokenData from "@/features/market/hooks/useTokenData";
import useWindowSize from "@/hooks/useWindowSize";
import { calculatePercentageChange, formatVolume } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { IMarketTableType } from "@/types/tableDataTypes";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { landingPageTokens, isLoading } = useTokenData();
  const { isMobile } = useWindowSize();

  // MARKET TABLE
  const marketColumns: ColumnType<IMarketTableType>[] = [
    {
      key: "assetName",
      label: t("Token Name"),
      width: isMobile ? 200 : 300,
      headerClassName: "text-left p-3 pl-6 md:pl-7",
      customRender: (val, rowData: any) => (
        <div className="flex items-center gap-3 p-3 pl-6 md:pl-7">
          <Image
            src={rowData.pairDetails.url_logo || ""}
            alt={rowData.pairDetails.id || "Crypto"}
            className={classNames(
              "h-6 w-6 rounded-full",
              (rowData.pairDetails.traded_currency === "omg" ||
                rowData.pairDetails.traded_currency === "btt") &&
                "bg-white",
            )}
            width={32}
            height={32}
            loading="lazy"
          />
          {val}
        </div>
      ),
    },
    {
      key: "pair",
      label: t("Token Pair"),
      width: isMobile ? 100 : 120,
      headerClassName: "text-left pl-5 md:pl-0",
      customRender: (_, rowData: any) => (
        <span className="pl-5 md:pl-0">{rowData.pairDetails.description}</span>
      ),
    },
    {
      key: "price",
      label: t("Price"),
      width: 220,
      type: "number",
      headerClassName: "text-right p-4",
      className: "flex h-[60px] items-center justify-end p-4",
      customRender: (value, rowData: any) =>
        formatCurrencyValue(
          parseFloat(value || "0"),
          rowData.pairDetails?.base_currency?.toUpperCase() || "IDR",
          true,
        ),
    },
    {
      key: "volume_24h",
      label: t("24h Volume"),
      width: isMobile ? 160 : 200,
      type: "number",
      headerClassName: "text-right p-4",
      className: "text-right p-4",
      customRender: (value) => formatVolume(value),
    },
    {
      key: "change_24h",
      label: t("24h Change"),
      width: isMobile ? 158 : 218,
      type: "number",
      headerClassName: "text-right p-4",
      className: "text-right p-4",
      customRender: (value) => (
        <span
          className={classNames(
            value.isPositive ? "text-success" : "text-error",
          )}
        >
          {value.formatted}
        </span>
      ),
    },
    {
      key: "change_7d",
      label: t("7d Change"),
      width: isMobile ? 160 : 220,
      type: "number",
      headerClassName: "text-right p-4 pr-7",
      className: "text-right p-4 pr-7",
      customRender: (value) => (
        <span
          className={classNames(
            value.isPositive ? "text-success" : "text-error",
          )}
        >
          {value.formatted}
        </span>
      ),
    },
  ];

  const tableData = landingPageTokens.map((token) => ({
    ...token,
    assetName: token.priceDetails?.name ?? "",
    pair: token.pairDetails?.ticker_id ?? "",
    price: token.priceDetails?.last ?? "0",
    volume_24h: token.priceDetails?.vol_quoted ?? "0",
    change_24h: calculatePercentageChange(
      token.priceDetails?.last ?? 0,
      token.priceDetails?.price_24h ?? 0,
    ),
    change_7d: calculatePercentageChange(
      token.priceDetails?.last ?? 0,
      token.priceDetails?.price_7d ?? 0,
    ),
  }));

  // FEATURES
  const features: FeatureSectionProps[] = [
    {
      title: "Pantau Pasar Kripto Secara Real-Time",
      description:
        "Jelajahi berbagai pasangan aset kripto dengan data harga langsung, volume, dan tren. Dilengkapi chart interaktif untuk membantu Anda menganalisis pasar dengan mudah.",
      image: "/images/feature_market.svg",
      link: "/market",
      linkText: "Lihat Pasar",
      side: "left",
    },
    {
      title: "Belajar Trading Tanpa Risiko",
      description:
        "Praktikkan pembelian dan penjualan aset kripto tanpa risiko. Fitur ini membantu Anda memahami mekanisme trading sambil belajar membuat keputusan investasi.",
      image: "/images/feature_trading.svg",
      link: "/auth/register",
      linkText: "Mulai Trading",
      side: "right",
    },
    {
      title: "Pantau Riwayat Transaksi Anda",
      description:
        "Simpan catatan lengkap dari semua aktivitas trading Anda. Lihat riwayat transaksi, analisis perdagangan sebelumnya, dan buat keputusan yang lebih baik untuk investasi di masa depan.",
      image: "/images/feature_transactions.svg",
      link: "/transactions",
      linkText: "Lihat Riwayat",
      side: "left",
    },
    {
      title: "Lihat dan Pantau Portofolio Anda",
      description:
        "Pelajari cara membaca portofolio dengan grafik dan data aset yang lengkap. Simulasi ini dirancang untuk membantu Anda memahami hasil keputusan trading Anda.",
      image: "/images/feature_portfolio.svg",
      link: "/portfolio",
      linkText: "Lihat Portofolio",
      side: "right",
    },
  ];

  return (
    <Layout>
      {/* HERO BANNER */}
      <section className="space-y-6 md:mt-10 md:flex md:justify-between md:gap-8 md:space-y-0">
        <div className="md:mt-14">
          <div className="w-full space-y-1 md:space-y-3">
            <h1 className="max-w-[600px] font-sora text-3xl font-semibold md:text-5xl">
              Belajar Trading Praktis dan Aman.
            </h1>
            <p className="max-w-[550px] text-sm text-textSecondary md:text-base">
              Lingkungan simulasi yang dirancang khusus untuk pemula. Tanpa
              risiko kehilangan uang sungguhan, Anda dapat memahami pasar kripto
              dengan lebih mendalam dan profesional.
            </p>
          </div>
          <Link href="/auth/register">
            <Button className="mt-4 md:mt-5">Daftar Sekarang</Button>
          </Link>
        </div>
        <div className="h-[400px] w-full max-w-[650px] rounded-lg border-2 border-borderColor bg-cardBackground p-5">
          <div className="flex gap-3">
            {["bg-error", "bg-warning", "bg-success"].map((v) => (
              <div key={v} className={classNames("size-4 rounded-full", v)} />
            ))}
          </div>
        </div>
      </section>

      {/* MARKET TABLE */}
      <section className="mt-[80px] rounded-xl border border-borderColor">
        <CustomTable
          columns={marketColumns}
          data={tableData ?? []}
          wrapperClassName="border-none !rounded-none max-w-[calc(100vw-2rem)] md:max-w-none"
          rowKey="pair"
          rowHeight={64}
          onRowClick={(row) => router.push(`/market/${row.pair}`)}
        />
        {isLoading && (
          <div className="w-full border-b border-borderColor px-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex gap-3">
                <Shimmer className="my-4 h-9 w-[3%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[3%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[25%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[14%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[20%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[18%] rounded-md" />
                <Shimmer className="my-4 h-9 w-[17%] rounded-md" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="mt-20 grid w-full justify-center space-y-20">
        {features.map((feature) => (
          <FeatureSection key={feature.title} {...feature} />
        ))}
      </section>
    </Layout>
  );
}
