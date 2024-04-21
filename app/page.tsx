'use client';
import React from 'react';
import {
  AppBreadcrumb,
  BreadcrumbItem,
} from '../src/components/common/app/AppBreadcrumb';
import t from '@/dictionaries/en.json';
import { AppContent } from '../src/components/common/app/AppContent';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: t.home,
  },
];

const App: React.FC = () => {
  return (
    <>
      <AppBreadcrumb items={breadcrumbs} />
      <AppContent>Content</AppContent>
    </>
  );
};

export default App;
