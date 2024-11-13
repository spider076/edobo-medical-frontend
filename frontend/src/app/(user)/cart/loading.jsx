import React from 'react';
import CartSkeleton from 'src/components/skeletons/cart';

export default async function CartLoading() {
  return <CartSkeleton />;
}
