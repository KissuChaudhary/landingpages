'use client';

import React from 'react';
import { UnrealLandingPage } from './components/UnrealLandingPage';

export default function UnrealShotTemplate() {
  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-[#45c4f9]/35">
      <UnrealLandingPage />
    </div>
  );
}
