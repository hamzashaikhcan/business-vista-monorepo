import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const CkEditor = dynamic(() => import('../../../modules/Extensions/Editors/CkEditor'), {
  loading: () => <PageLoader />,
});

const CkEditorPage = () => (
  <SecurePage>
    <CkEditor />
  </SecurePage>
);

export default CkEditorPage;
