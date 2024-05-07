'use client';
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import t from '@/dictionaries/en.json';
import { MenuInfo } from 'rc-menu/lib/interface';
import { usePathname, useRouter } from 'next/navigation';

const items = [
  {
    key: '/',
    label: t.home,
  },
  {
    key: '/schedule',
    label: t.schedule,
  },
  {
    key: '/love-ivy',
    label: t.ivy,
  },
  {
    key: '/auth/logout',
    label: t.signOut,
  },
];

export const AppMenu = () => {
  const [keyMenu, setKeyMenu] = useState('/');
  const router = useRouter();
  const pathname = usePathname();
  const handleRedirectLink = (info: MenuInfo) => {
    setKeyMenu(info.key);
    router.push(info.key);
  };

  useEffect(() => {
    setKeyMenu(pathname);
  }, [pathname]);

  return (
    <Menu
      theme="light"
      mode="horizontal"
      items={items}
      style={{ flex: 1, minWidth: 0 }}
      onClick={handleRedirectLink}
      activeKey={keyMenu}
    />
  );
};
