import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'Dashboard', title: 'Dashboard', href: paths.dashboard.Dashboard, icon: 'chart-pie' },
  { key: 'lead', title: 'Leads', href: paths.dashboard.leads, icon: 'users' },
  { key: 'Developer', title: 'Developers', href: paths.dashboard.developer, icon: 'users' },
  { key: 'businessdeveloper', title: 'Business-Developer', href: paths.dashboard.businessdeveloper, icon: 'users' },
  { key: 'permission', title: 'Permissions', href: paths.dashboard.permission, icon: 'users' },
  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },

  { key: 'account', title: 'Profile Settings', href: paths.dashboard.account, icon: 'user' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
