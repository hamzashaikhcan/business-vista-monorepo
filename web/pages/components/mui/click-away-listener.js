import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ClickAwayListener = dynamic(() => import('../../../modules/Components/MuiComponents/ClickAwayListener'), {
  loading: () => <PageLoader />,
});

const ClickAwayListenerPage = () => (
  <SecurePage>
    <ClickAwayListener />
  </SecurePage>
);

export default ClickAwayListenerPage;
