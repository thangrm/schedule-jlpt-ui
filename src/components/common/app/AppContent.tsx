import React, { ReactNode } from 'react';
import { theme } from 'antd';

export const AppContent = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: colorBgContainer,
        minHeight: 1000,
        padding: 24,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </div>
  );
};
