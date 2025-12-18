import React from "react";
import { useGetHomePageQuery } from "../services/HomePageApi/HomePageApi";
import { Loader2 } from "lucide-react";

function ShopCategory() {
  const { isLoading, data } = useGetHomePageQuery();
  const shopCategory = data?.shopCategory || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    // 🔑 overflow-hidden prevents grid from affecting navbar & bottom bar
    <section className="bg-gray-50 overflow-hidden">
      <div className="px-4 md:px-16 py-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-red-600 mb-8">
          Shop by Category
        </h2>

        <div className="space-y-6 md:space-y-8">
          {Object.entries(shopCategory).map(([row, images]) => (
            <div
              key={row}
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-6
                gap-3 md:gap-4
              "
            >
              {images.map((imgUrl, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={imgUrl}
                    alt="category"
                    className="
                      w-full
                      aspect-[3/4]
                      object-cover
                      block
                      transition-transform
                      duration-200
                      hover:scale-[1.03]
                    "
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default ShopCategory;
