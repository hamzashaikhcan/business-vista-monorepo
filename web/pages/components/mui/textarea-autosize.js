import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TextAreaAutosize = dynamic(() => import('../../../modules/Components/MuiComponents/TextareaAutosize'), {
  loading: () => <PageLoader />,
});

const TextAreaAutosizePage = () => (
  <SecurePage>
    <TextAreaAutosize />
  </SecurePage>
);

export default TextAreaAutosizePage;
