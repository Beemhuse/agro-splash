import { client } from "@/sanity/client";
import { COURSES_QUERY } from "@/sanity/queries"; // Import the query
import { ICourse } from '../constants/interfaces';
import Courses from "@/components/pages/courses/Courses";

const options = { next: { revalidate: 30 } };


export default async function Page() {
  const courses = await client.fetch<ICourse[]>(COURSES_QUERY, {}, options);
  return (
    <Courses courses={courses} />
    // <FilteredContent
    //   products={courses}
    //   categories={categories}
    //   promotions={promotions}
    //   topCategories={topCategories}
    // />
  )
}