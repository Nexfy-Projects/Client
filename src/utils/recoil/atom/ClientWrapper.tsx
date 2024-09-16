'use client';

import { RecoilRoot } from 'recoil';
import React from 'react';

export const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RecoilRoot>
      {' '}
      {/* 変更: RecoilRootでラップ */}
      {children}
    </RecoilRoot>
  );
};
