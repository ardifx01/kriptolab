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
    <div className="md:flex md:gap-[60px]">
      <div
        className={classNames(
          "rounded-lg border-2 border-borderColor md:w-[450px]",
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
          "mt-10 flex flex-col gap-4 md:w-[500px]",
          side === "left" ? "order-2" : "order-1",
        )}
      >
        <h2 className="font-sora text-4xl font-medium">{title}</h2>
        <p className="text-sm text-textSecondary">{description}</p>
        <Link href={link}>
          <Button className="mt-1">{linkText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Feature;
