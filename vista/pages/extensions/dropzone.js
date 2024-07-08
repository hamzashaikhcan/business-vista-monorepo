import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Dropzone = dynamic(() => import('../../modules/Extensions/ReactDropzone'), {
  loading: () => <PageLoader />,
});

const DropzonePage = () => (
  <SecurePage>
    <Dropzone />
  </SecurePage>
);

export default DropzonePage;
