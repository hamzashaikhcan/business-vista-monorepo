import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Modern = dynamic(() => import('../../modules/Widgets/Modern'), {
  loading: () => <PageLoader />,
});

const ModernWidgetPage = () => (
  <SecurePage>
    <Modern />
  </SecurePage>
);

export default ModernWidgetPage;
