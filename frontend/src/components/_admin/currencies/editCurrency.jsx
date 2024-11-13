import React from 'react';
// components
import CurrencyForm from 'src/components/forms/currency';

export default function addCurrency({ data, isLoading }) {
  return (
    <div>
      <CurrencyForm data={data} isLoading={isLoading} />
    </div>
  );
}
