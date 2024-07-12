import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TreeView = dynamic(() => import('../../../modules/Components/MuiComponents/TreeView'), {
  loading: () => <PageLoader />,
});

const TreeViewPage = () => (
  <SecurePage>
    <TreeView />
  </SecurePage>
);

export default TreeViewPage;
