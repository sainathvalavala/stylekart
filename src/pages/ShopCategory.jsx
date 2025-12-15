import React from "react";
import { useGetHomePageQuery } from "../services/HomePageApi/HomePageApi";

function ShopCategory() {
  const { isLoading, data } = useGetHomePageQuery();
  const shopCategory = data?.shopCategory || {};

  if (isLoading) {
    return <h2 className="text-center text-xl">Loading...</h2>;
  }

  return (
    <section className="px-6 md:px-16 py-10">
      <h2 className="text-center text-4xl font-bold text-red-600 mb-10">
        Shop by Category
      </h2>

      <div className="space-y-8">
        {Object.entries(shopCategory).map(([row, images]) => (
          <div
            key={row}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
          >
            {images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt="category"
                className="
                  w-full
                  aspect-[3/4]
                  object-cover
                  cursor-pointer
                  transition-transform
                  duration-200
                  hover:scale-[1.03]
                "
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShopCategory;
