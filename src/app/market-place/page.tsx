import CategoriesMenu from '@/components/pages/market/CategoriesMenu'
import SmartDeals from '@/components/pages/market/SmartDeals'
import TopCategories from '@/components/pages/market/TopCategories'
import TopDeals from '@/components/pages/market/TopDeals'
// import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

import { PRODUCTS_QUERY, CATEGORIES_QUERY, PROMOTIONS_QUERY } from "@/sanity/queries"; // Import the query
import { ICategory, IProduct, IPromotion, ITopCategory } from '../constants/interfaces';

const options = { next: { revalidate: 30 } };


export default async function Page() {
  const products = await client.fetch<IProduct[]>(PRODUCTS_QUERY, {}, options);
  const categories = await client.fetch<ICategory[]>(CATEGORIES_QUERY, {}, options);
  const topCategories = await client.fetch<ITopCategory[]>(CATEGORIES_QUERY, {}, options);
  const promotions = await client.fetch<IPromotion[]>(PROMOTIONS_QUERY, {}, options);
console.log(products)
  return (
    <section>
        <CategoriesMenu categories={categories} />
        <SmartDeals products={products} />
        <TopDeals promotions={promotions} />
        <TopCategories topCategories ={topCategories} />

    </section>
  )
}