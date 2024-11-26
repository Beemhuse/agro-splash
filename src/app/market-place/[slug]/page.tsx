import { Metadata } from "next";
import { client } from "@/sanity/client";
import { IProduct } from "@/app/constants/interfaces";
import ImageDisplay from "@/components/pages/market/ImageDisplay";
import ProductTabs from "@/components/pages/market/ProductTabs";


// Fetch single product data based on slug
export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)] {
      "slug": slug.current
    }`
  );

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

// Fetch metadata for SEO
export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      name, description
    }`,
    { slug: params.slug }
  );

  return {
    title: `${product?.name} - AgroSplash`,
    description: product?.description,
  };
}

// Page Component
const Page = async ({ params }: { params: { slug: string } }) => {
  const product: IProduct = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      category,
      price,
      originalPrice,
      additionalInfo,
      discount,
      savings,
      image[] {
        asset-> {
          url
        }
      },
      isOutOfStock,
      rating,
      description,
      review[]-> {
        _id,
        comment,
        rating,
        createdAt,
        user-> {
          name
        }
      }
    }`,
    { slug: params.slug }
  );

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <ImageDisplay product={product} />

        {/* Product Tabs */}
        <ProductTabs product={product} />
      </div>
    </section>
  );
};

export default Page;
