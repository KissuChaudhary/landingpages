'use client';

import React from 'react';
import { BarChart3, Download, FileText, LayoutGrid, Moon, Monitor, Package, Palette, Plus, Settings, Sun, UserPlus, Users } from 'lucide-react';
import { CommandPalette, type CommandItem } from '../registry/command-palette';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const ITEMS: CommandItem[] = [
  { id: 'dashboard', group: 'Go to', label: 'Dashboard', icon: <LayoutGrid />, shortcut: ['G', 'D'], onSelect: () => {} },
  { id: 'orders', group: 'Go to', label: 'Orders', icon: <Package />, shortcut: ['G', 'O'], description: '12 waiting', onSelect: () => {} },
  { id: 'customers', group: 'Go to', label: 'Customers', icon: <Users />, shortcut: ['G', 'C'], onSelect: () => {} },
  { id: 'reports', group: 'Go to', label: 'Reports', icon: <BarChart3 />, keywords: ['analytics', 'sales'], onSelect: () => {} },
  { id: 'new-order', group: 'Actions', label: 'New order', icon: <Plus />, shortcut: ['⌘', 'N'], onSelect: () => wait(900) },
  { id: 'invite', group: 'Actions', label: 'Invite a teammate', icon: <UserPlus />, keywords: ['team', 'member', 'add'], onSelect: () => wait(1100) },
  { id: 'export', group: 'Actions', label: 'Export this week’s sales', icon: <Download />, description: 'CSV', keywords: ['download', 'csv'], onSelect: () => wait(1400) },
  {
    id: 'theme',
    group: 'Actions',
    label: 'Change theme',
    icon: <Palette />,
    keywords: ['dark', 'light', 'appearance'],
    items: [
      { id: 'light', label: 'Light', icon: <Sun />, onSelect: () => wait(500) },
      { id: 'dark', label: 'Dark', icon: <Moon />, onSelect: () => wait(500) },
      { id: 'system', label: 'Match my system', icon: <Monitor />, onSelect: () => wait(500) },
    ],
  },
  { id: 'settings', group: 'Settings', label: 'Shop settings', icon: <Settings />, shortcut: ['⌘', ','], onSelect: () => {} },
  { id: 'docs', group: 'Settings', label: 'Keyboard shortcuts', icon: <FileText />, shortcut: ['?'], onSelect: () => {} },
];

export default function CommandPaletteDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <CommandPalette items={ITEMS} />
      <p className="text-center text-[12.5px] text-muted-foreground">Click it, or press ⌘K anywhere on the page.</p>
    </div>
  );
}
