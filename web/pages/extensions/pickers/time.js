import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TimePicker = dynamic(() => import('../../../modules/Extensions/Pickers/Time'), {
  loading: () => <PageLoader />,
});

const TimePickerPage = () => (
  <SecurePage>
    <TimePicker />
  </SecurePage>
);

export default TimePickerPage;
