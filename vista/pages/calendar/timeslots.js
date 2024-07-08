import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Timeslots = dynamic(() => import('../../modules/modules/Calendar/Timeslots'), {
  loading: () => <PageLoader />,
});

const TimeslotsCalendar = () => (
  <SecurePage>
    <Timeslots />
  </SecurePage>
);

export default TimeslotsCalendar;
