import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const DatePicker = dynamic(() => import('../../../modules/Extensions/Pickers/Date'), {
  loading: () => <PageLoader />,
});

const DatePickerPage = () => (
  <SecurePage>
    <DatePicker />
  </SecurePage>
);

export default DatePickerPage;
