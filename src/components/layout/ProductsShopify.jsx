import { useEffect, useState } from "react";
import CardStaticWrapper from "./CardStaticWrapper";
import SectionTitle from "./SectionTitle";

const SHOPIFY_DOMAIN = "aygjqx-cs.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "c6be7e0adfe169351e9ee597ca7efd1c";

export default function ProductsShopify() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 6) {
              edges {
                node {
                  id
                  title
                  description
                  handle
                  images(first:1) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data.products.edges)
        console.log(res.data.products.edges)
      })

      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="ml-5">
        <SectionTitle>
          <p className="text-xl lowercase">RARE VIBES SHOP</p>
        </SectionTitle></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.map(({ node }) => {
          // URL dell'immagine
          const imageUrl = node.images?.edges?.[0]?.node?.src || "https://via.placeholder.com/300";

          // URL prodotto Shopify
          const productUrl = `https://${SHOPIFY_DOMAIN}/products/${node.handle}`;

          return (
            <CardStaticWrapper>
              <div
                key={node.id}
                className="border rounded p-4 shadow hover:shadow-lg transition"
              >
                <a href={productUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={imageUrl}
                    alt={node.title}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <h2 className="font-bold text-lg">{node.title}</h2>
                </a>
                <p className="text-sm text-gray-600">{node.description}</p>
              </div></CardStaticWrapper>
          );
        })}
      </div></div>
  );
}
