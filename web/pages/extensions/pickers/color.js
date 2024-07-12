import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ColorPicker = dynamic(() => import('../../../modules/Extensions/Pickers/ReactColor'), {
  loading: () => <PageLoader />,
});

const ColorPickerPage = () => (
  <SecurePage>
    <ColorPicker />
  </SecurePage>
);

export default ColorPickerPage;
