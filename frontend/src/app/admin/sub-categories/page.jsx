import React from 'react';

// components
import SubCategoryList from 'src/components/_admin/subCategories/categoryList';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// apo
import * as api from 'src/services';

// Meta information
export const metadata = {
  title: 'Sub Categories - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default async function Categories() {
  const { data: categories } = await api.getAllCategoriesByAdmin();
  return (
    <>
      <HeaderBreadcrumbs
        admin
        heading="Sub Categories List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Sub Categories'
          }
        ]}
        action={{
          href: `/admin/sub-categories/add`,
          title: 'Add Sub Category'
        }}
      />
      <SubCategoryList categories={categories} />
    </>
  );
}
