import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const ToDo = dynamic(() => import('../../modules/Apps/TaskList'), {
  loading: () => <PageLoader />,
});

const ToDoPage = () => (
  <SecurePage>
    <ToDo />
  </SecurePage>
);

export default ToDoPage;
