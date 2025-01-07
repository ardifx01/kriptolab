import Layout from "@/components/Layout/Layout";
import FeatureSection from "@/features/landing/FeatureSection/FeatureSection";
import HeroBanner from "@/features/landing/HeroBanner/HeroBanner";
import LandingMarketTable from "@/features/landing/LandingMarketTable/LandingMarketTable";
import LandingNews from "@/features/landing/LandingNews/LandingNews";

export default function Home() {
  return (
    <Layout>
      <HeroBanner />
      <LandingMarketTable />
      <FeatureSection />
      <LandingNews />
    </Layout>
  );
}
