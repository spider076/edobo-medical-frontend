import { useSelector } from 'react-redux';

export const useCurrencyConvert = () => {
  const { rate } = useSelector((state) => state.settings); // Access currency and rate from Redux
  const convertCurrency = (number) => {
    return Number((number * rate).toFixed(1));
  };
  return convertCurrency;
};
