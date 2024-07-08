import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Profile = dynamic(() => import('../../../modules/Apps/Profile'), {
  loading: () => <PageLoader />,
});

const ProfilePage = () => (
  <SecurePage>
    <Profile />
  </SecurePage>
);

export default ProfilePage;
