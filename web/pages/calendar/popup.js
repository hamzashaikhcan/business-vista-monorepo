import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Popup = dynamic(() => import('../../modules/modules/Calendar/Popup'), {
  loading: () => <PageLoader />,
});

const PopupCalendar = () => (
  <SecurePage>
    <Popup />
  </SecurePage>
);

export default PopupCalendar;
