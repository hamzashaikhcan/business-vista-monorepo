import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Basic = dynamic(() => import('../../modules/modules/Calendar/Basic'), {
  loading: () => <PageLoader />,
});

const BasicCalendar = () => (
  <SecurePage>
    <Basic />
  </SecurePage>
);

export default BasicCalendar;
