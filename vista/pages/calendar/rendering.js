import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Rendering = dynamic(() => import('../../modules/modules/Calendar/Rendering'), {
  loading: () => <PageLoader />,
});

const RenderingCalendar = () => (
  <SecurePage>
    <Rendering />
  </SecurePage>
);

export default RenderingCalendar;
