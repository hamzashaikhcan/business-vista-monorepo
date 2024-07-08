import SignInPage from './signin';
import { useAuth } from '../authentication';
import AdminLeads from './dashboard/Leads';

const HomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <AdminLeads /> : <SignInPage />;
};

export default HomePage;
