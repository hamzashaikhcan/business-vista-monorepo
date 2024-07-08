import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const MediaObject = dynamic(() => import('../../../modules/Components/CorematComponents/MediaObjectDemo'), {
  loading: () => <PageLoader />,
});

const MediaObjectPage = () => (
  <SecurePage>
    <MediaObject />
  </SecurePage>
);

export default MediaObjectPage;
