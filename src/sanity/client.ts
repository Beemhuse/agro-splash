import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "aau0xsyx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  // If you're using a local server, replace this with the path to your sanity project
});