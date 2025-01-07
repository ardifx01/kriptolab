import React from "react";

import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";

const HeroBanner = () => {
  return (
    <section className="space-y-6 md:mt-10 md:flex md:justify-between md:gap-8 md:space-y-0">
      <div className="md:mt-14">
        <div className="w-full space-y-1 md:space-y-3">
          <h1 className="max-w-[600px] font-sora text-3xl font-semibold md:text-5xl">
            Belajar Trading Praktis dan Aman.
          </h1>
          <p className="max-w-[550px] text-sm text-textSecondary md:text-base">
            Lingkungan simulasi yang dirancang khusus untuk pemula. Tanpa risiko
            kehilangan uang sungguhan, Anda dapat memahami pasar kripto dengan
            lebih mendalam dan profesional.
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
  );
};

export default HeroBanner;
