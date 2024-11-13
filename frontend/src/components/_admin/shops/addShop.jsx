import React from 'react';
// components
import ProductForm from 'src/components/forms/product';

export default function addProduct({ brands, categories, subCategories, isVendor }) {
  return (
    <div>
      <ProductForm brands={brands} categories={categories} subCategories={subCategories} isVendor={isVendor} />
    </div>
  );
}
