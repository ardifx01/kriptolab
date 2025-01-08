import React from "react";

import Feature, { FeatureProps } from "./Feature";

const FeatureSection = () => {
  const features: FeatureProps[] = [
    {
      title: "Pantau Pasar Kripto Secara Real-Time",
      description:
        "Jelajahi berbagai pasangan aset kripto dengan data harga langsung, volume, dan tren. Dilengkapi chart interaktif untuk membantu Anda menganalisis pasar dengan mudah.",
      image: "/images/features/feature_market.png",
      link: "/market",
      linkText: "Lihat Pasar",
      side: "left",
    },
    {
      title: "Belajar Trading Tanpa Risiko",
      description:
        "Praktikkan pembelian dan penjualan aset kripto tanpa risiko. Fitur ini membantu Anda memahami mekanisme trading sambil belajar membuat keputusan investasi.",
      image: "/images/features/feature_trading.png",
      link: "/auth/register",
      linkText: "Mulai Trading",
      side: "right",
    },
    {
      title: "Pantau Riwayat Transaksi Anda",
      description:
        "Simpan catatan lengkap dari semua aktivitas trading Anda. Lihat riwayat transaksi, analisis perdagangan sebelumnya, dan buat keputusan yang lebih baik untuk investasi di masa depan.",
      image: "/images/features/feature_transactions.png",
      link: "/transactions",
      linkText: "Lihat Riwayat",
      side: "left",
    },
    {
      title: "Lihat dan Pantau Portofolio Anda",
      description:
        "Pelajari cara membaca portofolio dengan grafik dan data aset yang lengkap. Simulasi ini dirancang untuk membantu Anda memahami hasil keputusan trading Anda.",
      image: "/images/features/feature_portfolio.png",
      link: "/portfolio",
      linkText: "Lihat Portofolio",
      side: "right",
    },
  ];

  return (
    <section className="mt-12 grid w-full justify-center space-y-12 md:mt-20 md:space-y-20">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </section>
  );
};

export default FeatureSection;
