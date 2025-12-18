export const getProductId = (product) => {
  if (!product) return null;

  return (
    product.Product_id || // Myntra
    product.id ||         // Kids + Beauty
    null
  );
};
