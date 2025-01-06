import { useTranslation } from "react-i18next";

import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="mt-10 flex justify-between gap-8">
        <div className="mt-14">
          <div className="w-full space-y-3">
            <h1 className="max-w-[600px] font-sora text-5xl font-semibold">
              Belajar Trading Praktis dan Aman.
            </h1>
            <p className="max-w-[550px] text-textSecondary">
              Lingkungan simulasi yang dirancang khusus untuk pemula. Tanpa
              risiko kehilangan uang sungguhan, Anda dapat memahami pasar kripto
              dengan lebih mendalam dan profesional.
            </p>
          </div>
          <Link href="/auth/register">
            <Button className="mt-5">Daftar Sekarang</Button>
          </Link>
        </div>
        <div className="w-full max-w-[650px] rounded-lg border-2 border-borderColor bg-cardBackground p-5">
          <div className="flex gap-3">
            {["bg-error", "bg-warning", "bg-success"].map((v) => (
              <div key={v} className={classNames("size-4 rounded-full", v)} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
