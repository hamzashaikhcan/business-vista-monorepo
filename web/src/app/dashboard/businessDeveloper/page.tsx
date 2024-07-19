import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import BusinessDevelopers from '../../../components/dashboard/BusinessDeveloper';
export const metadata = { title: `BusinessDeveloper | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <>
      <BusinessDevelopers />
    </>
  );
}
