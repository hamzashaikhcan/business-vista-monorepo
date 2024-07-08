import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Cultures = dynamic(() => import('../../modules/modules/Calendar/Cultures'), {
  loading: () => <PageLoader />,
});

const CulturesCalendar = () => (
  <SecurePage>
    <Cultures />
  </SecurePage>
);

export default CulturesCalendar;
