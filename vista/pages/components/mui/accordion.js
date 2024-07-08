import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Accordion = dynamic(() => import('../../../modules/Components/MuiComponents/Accordion'), {
  loading: () => <PageLoader />,
});

const AccordionPage = () => (
  <SecurePage>
    <Accordion />
  </SecurePage>
);

export default AccordionPage;
