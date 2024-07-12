import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Contact = dynamic(() => import('../../modules/Apps/ContactApp'), {
  loading: () => <PageLoader />,
});

const ContactPage = () => (
  <SecurePage>
    <Contact />
  </SecurePage>
);

export default ContactPage;
