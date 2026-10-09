'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';
import DemoToolbar, { type DeviceMode } from '@/components/DemoToolbar';
import { getTemplateBySlug } from '@/data/templates';
import { ArrowLeft } from 'lucide-react';

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function DemoPage({ params }: DemoPageProps) {
  const resolvedParams = use(params);
  const template = getTemplateBySlug(resolvedParams.slug);

  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The preview frame can finish loading before React hydrates, and then its onLoad never reaches us and the
  // loading overlay stays up forever. Check the frame once mounted, and clear the overlay after a few seconds
  // regardless: a slow preview should still be visible.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      const doc = frame.contentDocument;
      if (doc && doc.readyState === 'complete' && doc.location.href !== 'about:blank') setIsLoading(false);
    } catch {
      // Cross-origin frames cannot be inspected; the timer below covers them.
    }
    const timer = window.setTimeout(() => setIsLoading(false), 4000);
    return () => window.clearTimeout(timer);
  }, [iframeKey]);

  if (!template) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f6f6] px-4 text-center text-[#181925]">
        <h1 className="text-2xl font-medium">Template Not Found</h1>
        <p className="mt-2 text-xs text-[#777]">
          The requested template "{resolvedParams.slug}" does not exist in the library.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#181925] px-5 py-2 text-xs font-medium text-white hover:bg-black transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const getContainerStyle = () => {
    switch (device) {
      case 'desktop':
        return 'w-full h-full rounded-none border-0 shadow-none';
      case 'laptop':
        return 'w-[1024px] max-w-[95vw] h-[85vh] rounded-2xl border border-black/[0.1] shadow-2xl bg-white';
      case 'tablet':
        return 'w-[768px] max-w-[95vw] h-[85vh] rounded-2xl border border-black/[0.1] shadow-2xl bg-white';
      case 'mobile':
        return 'w-[375px] max-w-[95vw] h-[812px] max-h-[90vh] rounded-[46px] border-[10px] border-[#181925] shadow-2xl bg-white overflow-hidden';
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#f6f6f6]">
      {/* Clean Editorial Navigation Toolbar */}
      <DemoToolbar
        template={template}
        currentDevice={device}
        onDeviceChange={(newDevice) => setDevice(newDevice)}
        onRefresh={handleRefresh}
      />

      {/* Main Viewport Stage */}
      <main className="relative flex flex-1 items-center justify-center overflow-auto">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-xs">
            <div className="flex flex-col items-center gap-2.5">
              <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs font-mono text-[#666]">Loading {template.title}...</span>
            </div>
          </div>
        )}

        {/* Device Frame */}
        <div
          className={`relative transition-all duration-300 ease-in-out overflow-hidden bg-white ${getContainerStyle()}`}
        >
          {/* Mobile Speaker / Camera Pill if mobile */}
          {device === 'mobile' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-3.5 w-24 rounded-full bg-[#181925]" />
          )}

          <iframe
            key={iframeKey}
            ref={frameRef}
            src={template.standaloneUrl || `/preview/${template.slug}`}
            title={template.title}
            onLoad={() => setIsLoading(false)}
            className="h-full w-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox={`allow-scripts allow-same-origin allow-forms allow-popups allow-modals${['stillform', 'prism', 'patch', 'relay', 'index'].includes(template.slug) ? ' allow-downloads' : ''}`}
          />
        </div>
      </main>
    </div>
  );
}
