import { client } from "@/sanity/client";
import { BOOKS_QUERY, COURSES_QUERY } from "@/sanity/queries"; // Import the query
import { IBook, ICourse } from '../../constants/interfaces';
import Courses from "@/components/pages/courses/Courses";

const options = { next: { revalidate: 30 } };


export default async function Page() {
  const courses = await client.fetch<ICourse[]>(COURSES_QUERY, {}, options);
  const books = await client.fetch<IBook[]>(BOOKS_QUERY, {}, options);
  return (
    <Courses courses={courses} books={books} />
    // <FilteredContent
    //   products={courses}
    //   categories={categories}
    //   promotions={promotions}
    //   topCategories={topCategories}
    // />
  )
}