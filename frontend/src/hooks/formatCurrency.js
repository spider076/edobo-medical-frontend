import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useCurrencyFormatter = (curr) => {
  const { currency } = useSelector((state) => state.settings); // Access currency and rate from Redux

  const [formatter, setFormatter] = useState(null);
  const locale = 'en-US';
  useEffect(() => {
    if (currency && locale) {
      const newFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: curr || currency
      });
      setFormatter(newFormatter);
    }
  }, [currency, locale, curr]);

  const formatCurrency = (number) => {
    if (!formatter) return number;
    return formatter.format(Number(number)).slice(0, -1);
  };

  return formatCurrency;
};
