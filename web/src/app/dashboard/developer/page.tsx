import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import DevelopersIndex from '@/components/dashboard/Developer/index';
export const metadata = { title: `Developer | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <DevelopersIndex />;
}
