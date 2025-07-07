import { Metadata } from "next";

import fetchContentType from "../../../../lib/strapi/fetchContentType";
import { generateMetadataObject } from "../../../../lib/shared/metadata";
import { ArticleLayout } from "@/app/components/shared/Page/ArticleLayout";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "blogs",
    `filters[slug][$eq]=${params.slug}&populate=seo.metaImage`,
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const pageData = await fetchContentType(
    "blogs",
    `filters[slug][$eq]=${params.slug}`,
    true
  );
  if (!pageData) {
    return (
      <>
        <div className="min-h-80 flex flex-col justify-center items-center">
          <div className="h-full">
            <p className="text-6xl teko text-center">404</p>
            <p className="text-xl text-center teko">Oops ! page not found</p>
          </div>
        </div>
      </>
    );
  }

  return <ArticleLayout data={pageData} showBackButton={true} />;
}
