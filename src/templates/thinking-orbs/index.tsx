'use client';
import { App as EntryComponent } from './demo/App';

export default function TemplateView() {
  return (
    <div className="w-full min-h-screen">
      <EntryComponent />
    </div>
  );
}
