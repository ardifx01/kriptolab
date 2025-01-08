import React from "react";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";

export interface FeatureProps {
  side: "left" | "right";
  image: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const Feature = ({
  description,
  image,
  link,
  linkText,
  side,
  title,
}: FeatureProps) => {
  return (
    <div className="space-y-7 md:flex md:gap-[60px] md:space-y-0">
      <div
        className={classNames(
          "flex flex-col gap-1 md:mt-10 md:w-[500px] md:gap-4",
          side === "left" ? "md:order-2" : "md:order-1",
        )}
      >
        <h2 className="font-sora text-2xl font-medium md:text-4xl">{title}</h2>
        <p className="text-sm text-textSecondary">{description}</p>
        <Link href={link}>
          <Button className="mt-3 md:mt-1">{linkText}</Button>
        </Link>
      </div>

      <div
        className={classNames(
          "rounded-lg border-2 border-borderColor md:w-[450px]",
          side === "left" ? "md:order-1" : "md:order-2",
        )}
      >
        <Image
          src={image}
          alt={title}
          width={450}
          height={400}
          className="h-full w-full rounded-lg shadow-sm"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Feature;
