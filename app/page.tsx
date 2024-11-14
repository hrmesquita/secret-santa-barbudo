'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DesktopLayout from '@/components/desktopLayout';

// Dynamically import MobileLayout to avoid SSR issues with window object
const MobileLayout = dynamic(() => import('@/components/mobileLayout'), { ssr: false });

export default function SecretSantaForm() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen">
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}