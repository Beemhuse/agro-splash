import { groq } from "next-sanity";

export const PRODUCTS_QUERY = `*[
  _type == "product" && !(_id in path("drafts.**")) && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  name,
  publishedAt,
  slug,
  price,
  favouriteBy,
  rating,
  category-> {
    _id,
    name
  },
  image[] {
    asset-> {
      url
    }
  }
}`;

export const COURSES_QUERY = `*[
    _type == "course" && !(_id in path("drafts.**")) && defined(slug.current)
  ] | order(_createdAt desc)[0...12] {
    _id,
    title,
    slug,
    price,
    videoLink,
    rating,
    thumbnail{
      asset-> {
        url
      }
    }
  }`;

export const CATEGORIES_QUERY = `*[
    _type == "category" && !(_id in path("drafts.**"))
  ] | order(_createdAt asc) {
    _id,
    name,
    description,
    image{asset->{url}},

  }`;

export const PROMOTIONS_QUERY = `*[
    _type == "promotion" && !(_id in path("drafts.**"))
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

//   export const ORDERS_BY_CUSTOMER_QUERY = groq`
//   *[_type == "order" && customer._ref == $customerId]{
//     _id,
//     transactionRef,
//     total,
//     products[]{
//       product->{
//         _id,
//         name,
//         price,
//         image.asset->url
//       },
//       quantity
//     },
//     discount,
//     shippingCost,
//     customer->{
//       name,
//       email,
//       phone,
//       address
//     },
//     status,
//     paymentMethod,
//     createdAt
//   } | order(createdAt desc)
// `;

export function buildOrdersQuery(customerId: string) {
  return groq`
    *[_type == "order" && customer._ref == "${customerId}" && !(_id in path("drafts.**"))]{
      _id,
      transactionRef,
      total,
      products[] {
        product->{
          _id,
          name,
          price,
          sku, // Add SKU if available in the product schema
          description, // Add description if needed
          "image": image.asset->url // Fetch the product image
        },
        quantity // Include quantity for each product
      },
      discount, // Include discount applied to the order, if any
      serviceFee->{
        _id,
        location,
        fee // Fetch the service fee details
      },
      customer->{
        name,
        email,
        phone,
        address
      },
      status, // Order status (e.g., pending, shipped, delivered)
      paymentMethod, // Payment method used (e.g., Paystack, Cash)
      _createdAt // Order creation date
    } | order(_createdAt desc) // Order by creation date, most recent first
  `;
}

export function buildOrdersQueryByTransactionRef(transactionRef: string) {
  return groq`
    *[_type == "transaction" && transactionRef == "${transactionRef}" && !(_id in path("drafts.**"))]{
      _id,
      transactionRef,
      amount,
      status,
      method,
      transactionDate,
      order->{
        _id,
        total,
        status,
        products[] {
          product->{
            _id,
            name,
            price,
 image[] {
      asset-> {
        url
      }
    },          },
          quantity
        },
        streetAddress,
        serviceFee->{
        fee,
        _id
        },
        customer->{
          name,
          email,
          phone,
          address
        },
        status,
        _createdAt
      }
    }
  `;
}



export const getCustomerDetailsQuery = (customerId: string) => groq`
  *[_type == "customer" && _id == "${customerId}"][0]{
    name,
    email,
    phone,
    address,
    createdAt,
    updatedAt,
    isActive,
    orderCount,
    totalSpent,
    "orders": orders[]->{
      _id,
      transactionRef,
      total,
      status,
      createdAt
    },
    "transactions": transactions[]->{
      _id,
      transactionDate,
      amount,
      status
    }
  }
`;
