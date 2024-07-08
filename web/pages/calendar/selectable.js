import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Selectable = dynamic(() => import('../../modules/modules/Calendar/Selectable'), {
  loading: () => <PageLoader />,
});

const SelectableCalendar = () => (
  <SecurePage>
    <Selectable />
  </SecurePage>
);

export default SelectableCalendar;
