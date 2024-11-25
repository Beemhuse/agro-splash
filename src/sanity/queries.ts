export const PRODUCTS_QUERY = `*[
    _type == "product" && defined(slug.current)
  ] | order(publishedAt desc)[0...12] {
    _id,
    name,
    publishedAt,
    slug,
    price,
    rating,
    category-> {
      _id,
      name
    },
    image {
      asset-> {
        url
      }
    }
  }`;
  
  export const CATEGORIES_QUERY = `*[
    _type == "category"
  ] | order(_createdAt asc) {
    _id,
    name,
    description,
    image{asset->{url}},

  }`;
  
  export const PROMOTIONS_QUERY = `*[
    _type == "promotion"
  ] | order(_createdAt desc) {
    _id,
    brand,
    description,
    image {
      asset-> {
        url
      }
    },
    backgroundColor
  }`;
  