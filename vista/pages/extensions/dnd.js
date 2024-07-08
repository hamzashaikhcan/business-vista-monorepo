import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Dnd = dynamic(() => import('../../modules/Extensions/DragAndDrop'), {
  loading: () => <PageLoader />,
});

const DndPage = () => (
  <SecurePage>
    <Dnd />
  </SecurePage>
);

export default DndPage;
