import React from "react";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import Button from "../Button/Button";

export interface FeatureSectionProps {
  side: "left" | "right";
  image: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureSection = ({
  description,
  image,
  link,
  linkText,
  side,
  title,
}: FeatureSectionProps) => {
  return (
    <div className="flex gap-[60px]">
      <div
        className={classNames(
          "w-[450px] rounded-lg border-2 border-borderColor",
          side === "left" ? "order-1" : "order-2",
        )}
      >
        <Image
          src={image}
          alt={title}
          width={450}
          height={355}
          className="h-full w-full rounded-lg shadow-sm"
        />
      </div>
      <div
        className={classNames(
          "mt-10 flex w-[500px] flex-col gap-4",
          side === "left" ? "order-2" : "order-1",
        )}
      >
        <h2 className="font-sora text-4xl font-semibold">{title}</h2>
        <p className="text-sm text-textSecondary">{description}</p>
        <Link href={link}>
          <Button className="mt-1">{linkText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureSection;
