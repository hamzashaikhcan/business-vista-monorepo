import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const DateTimePicker = dynamic(() => import('../../../modules/Extensions/Pickers/DateTime'), {
  loading: () => <PageLoader />,
});

const DateTimePickerPage = () => (
  <SecurePage>
    <DateTimePicker />
  </SecurePage>
);

export default DateTimePickerPage;
