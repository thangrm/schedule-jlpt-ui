'use client';
import React from 'react';
import { Breadcrumb } from 'antd';

export type BreadcrumbItem = {
  title: string;
  href?: string;
};
export const AppBreadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return <Breadcrumb style={{ margin: '16px 0' }} items={items} />;
};
