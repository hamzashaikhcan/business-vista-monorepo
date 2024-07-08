import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Search = dynamic(() => import('../../../modules/Components/CorematComponents/SearchDemo'), {
  loading: () => <PageLoader />,
});

const SearchPage = () => (
  <SecurePage>
    <Search />
  </SecurePage>
);

export default SearchPage;
