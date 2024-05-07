'use client';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('token');
    router.push('/auth/login');
  });

  return <></>;
};

export default LogoutPage;
