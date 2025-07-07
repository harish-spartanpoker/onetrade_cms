import React from "react";
import { format } from "date-fns";
import DynamicZoneManager from "../../dynamic-zone/manager";
import Image from "next/image";
import { strapiImage } from "../../../../../lib/strapi/strapiImage";
import BlogBackButton from "./BlogBackButton";

export async function ArticleLayout({
  data,
  showBackButton,
}: {
  data: any;
  showBackButton?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-4xl px-4">
      {showBackButton && <BlogBackButton />}
      <div className="page-header mt-24 text-black md:mt-10">
        {data.banner && (
          <Image
            alt={data.banner.alternativeText || ""}
            src={strapiImage(data.banner.url)}
            className="mx-auto block h-auto max-w-full rounded-lg"
            width={900}
            height={300}
          />
        )}

        <p className="h6 montserrat text-center text-white">
          {data.articleDescription}
        </p>
        <p className="montserrat mt-4 text-center text-base text-white">
          {format(new Date(data.publishedAt), "MMMM dd, yyyy")}
        </p>
      </div>
      <div className="page-body my-6 text-white">
        {data?.DynamicZone && (
          <DynamicZoneManager dynamicZone={data?.DynamicZone} />
        )}
      </div>
    </div>
  );
}
