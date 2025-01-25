import { client } from "@/sanity/client";
import { PRODUCTS_QUERY, CATEGORIES_QUERY, PROMOTIONS_QUERY } from "@/sanity/queries"; // Import the query
import { ICategory, IProduct, IPromotion, ITopCategory } from '../../constants/interfaces';
import FilteredContent from '@/components/pages/market/FilteredContent';

const options = { next: { revalidate: 30 } };


export default async function Page() {
  const products = await client.fetch<IProduct[]>(PRODUCTS_QUERY, {}, options);
  const categories = await client.fetch<ICategory[]>(CATEGORIES_QUERY, {}, options);
  console.log(categories, 'categories')
  const topCategories = await client.fetch<ITopCategory[]>(CATEGORIES_QUERY, {}, options);
  const promotions = await client.fetch<IPromotion[]>(PROMOTIONS_QUERY, {}, options);
  return (
    <FilteredContent
      products={products}
      categories={categories}
      promotions={promotions}
      topCategories={topCategories}
    />
  )
}