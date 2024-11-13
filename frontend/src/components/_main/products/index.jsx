'use client';
// react
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// mui
import { useMediaQuery } from '@mui/material';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
// components
import ProductList from './productList';
import SortBar from './sortbar';
ProductListing.propTypes = {
  category: PropTypes.object,
  subCategory: PropTypes.object,
  shop: PropTypes.object
};
// dynamic components
const Pagination = dynamic(() => import('src/components/pagination'));

const sortData = [
  { title: 'Top Rated', key: 'top', value: -1 },
  { title: 'Asceding', key: 'name', value: 1 },
  { title: 'Desceding', key: 'name', value: -1 },
  { title: 'Price low to high', key: 'price', value: 1 },
  { title: 'Price high to low', key: 'price', value: -1 },
  { title: 'Oldest', key: 'date', value: 1 },
  { title: 'Newest', key: 'date', value: -1 }
];
const getSearchParams = (searchParams) => {
  return searchParams.toString().length ? '?' + searchParams.toString() : '';
};
export default function ProductListing({ category, subCategory, shop, compaign }) {
  const searchParams = useSearchParams();
  const { rate } = useSelector(({ settings }) => settings);
  const { data, isLoading } = useQuery(
    [
      'products' + category || subCategory ? '-with-category' : '',
      searchParams.toString(),
      category,
      subCategory,
      shop
    ],
    () =>
      api[
        category
          ? 'getProductsByCategory'
          : subCategory
            ? 'getProductsBySubCategory'
            : shop
              ? 'getProductsByShop'
              : compaign
                ? 'getProductsByCompaign'
                : 'getProducts'
      ](
        getSearchParams(searchParams),
        shop ? shop?.slug : category ? category?.slug : subCategory ? subCategory?.slug : compaign ? compaign.slug : '',
        rate
      )
  );
  const isMobile = useMediaQuery('(max-width:900px)');
  return (
    <>
      <SortBar
        sortData={sortData}
        productData={data}
        category={subCategory?.parentCategory || category}
        shop={shop}
        subCategory={subCategory}
        isLoading={isLoading}
        compaign={compaign}
      />
      <ProductList data={data} isLoading={isLoading} isMobile={isMobile} />
      <Pagination data={data} />
    </>
  );
}
