import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';

import LeadsIndex from '../../../components/dashboard/Leads/index';

export const metadata = { title: `Leads | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <LeadsIndex />
    </>
  );
}
