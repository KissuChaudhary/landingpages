'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  Inbox, 
  Send, 
  BarChart3, 
  Briefcase, 
  Zap, 
  Settings, 
  User, 
  Mail, 
  Plus, 
  Trash2, 
  Play, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ChevronLeft,
  Linkedin,
  MessageCircle,
  MoreHorizontal,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Sub-components ---

const PrimarySidebar = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  const navItems = [
    { icon: Search, label: 'Sourcing' },
    { icon: Users, label: 'Candidates' },
    { icon: Inbox, label: 'Inbox' },
    { icon: Send, label: 'Outreach', active: true, children: [
      { label: 'Outreach queue' },
      { label: 'Outreach sequence', active: true },
    ]},
    { icon: BarChart3, label: 'Reports' },
  ];

  const otherItems = [
    { icon: Briefcase, label: 'Job settings' },
    { icon: Zap, label: 'Automations' },
  ];

  return (
    <div className={`
      absolute lg:relative z-50 h-full
      transition-all duration-300 ease-in-out flex shrink-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${isOpen ? 'lg:w-[255px]' : 'lg:w-0'}
    `}>
      <aside className="w-[255px] bg-sidebar-background border-r border-border-main flex flex-col h-full overflow-y-auto shadow-2xl lg:shadow-none">
        <div className="h-[54px] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-orange-main/10 flex items-center justify-center mr-2">
              <Zap size={16} className="text-orange-main" />
            </div>
            <span className="font-semibold text-[15px]">Workflow</span>
          </div>
          <button onClick={onToggle} className="text-text-muted hover:text-text-primary p-1 rounded-md hover:bg-black/5 transition-colors">
            <ChevronLeft size={16} className="hidden lg:block" />
            <X size={18} className="lg:hidden" />
          </button>
        </div>

        <nav className="px-3 mt-4 space-y-1">
          {navItems.map((item, idx) => (
            <div key={idx}>
              <div className={`flex items-center h-8 px-3 rounded-nav-item cursor-pointer group ${item.active && !item.children ? 'bg-muted-panel text-text-primary' : 'text-text-secondary hover:bg-muted-panel'}`}>
                <item.icon size={14} className={`mr-3 shrink-0 ${item.active ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'}`} />
                <span className="text-[14px] truncate">{item.label}</span>
              </div>
              {item.children && (
                <div className="mt-1 ml-7 space-y-1">
                  {item.children.map((child, cidx) => (
                    <div key={cidx} className={`flex items-center h-8 px-3 rounded-nav-item cursor-pointer text-[14px] truncate ${child.active ? 'bg-muted-panel text-text-primary' : 'text-text-secondary hover:bg-muted-panel'}`}>
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="px-6 my-6 shrink-0">
          <div className="h-[1px] bg-border-soft w-full" />
        </div>

        <div className="px-3 space-y-1">
          <div className="px-3 mb-2">
             <span className="text-[11px] font-semibold text-text-faint uppercase tracking-wider">Others</span>
          </div>
          {otherItems.map((item, idx) => (
            <div key={idx} className="flex items-center h-8 px-3 rounded-nav-item cursor-pointer text-text-secondary hover:bg-muted-panel group">
              <item.icon size={14} className="mr-3 shrink-0 text-text-muted group-hover:text-text-secondary" />
              <span className="text-[14px] truncate">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto p-3 space-y-1 shrink-0">
          <div className="flex items-center h-8 px-3 rounded-nav-item cursor-pointer text-text-secondary hover:bg-muted-panel group">
            <Settings size={14} className="mr-3 shrink-0 text-text-muted group-hover:text-text-secondary" />
            <span className="text-[14px]">Settings</span>
          </div>
          <div className="flex items-center h-8 px-3 rounded-nav-item cursor-pointer text-text-secondary hover:bg-muted-panel group">
            <User size={14} className="mr-3 shrink-0 text-text-muted group-hover:text-text-secondary" />
            <span className="text-[14px]">Profile</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

const SequenceSidebar = ({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className={`
      absolute lg:relative z-40 h-full
      transition-all duration-300 ease-in-out flex shrink-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${isOpen ? 'lg:w-[250px]' : 'lg:w-0'}
    `}>
      <aside className="w-[250px] bg-sidebar-background border-r border-border-main flex flex-col h-full overflow-y-auto shadow-2xl lg:shadow-none">
        <div className="h-[54px] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <button onClick={onToggle} className="w-7 h-7 shrink-0 rounded-md border border-border-soft flex items-center justify-center mr-3 cursor-pointer hover:bg-white transition-colors">
              <ChevronLeft size={14} className="text-text-secondary hidden lg:block" />
              <X size={14} className="text-text-secondary lg:hidden" />
            </button>
            <span className="text-[14px] font-medium truncate max-w-[100px]">Outreach was change</span>
          </div>
          <button className="h-8 px-[14px] shrink-0 bg-orange-main text-white text-[13px] font-semibold rounded-button hover:bg-orange-main/90 transition-colors">
            Save
          </button>
        </div>

        <div className="p-4 flex flex-col gap-6">
          <div>
            <div className="px-3 mb-3">
               <span className="text-[11px] font-semibold text-text-faint uppercase tracking-[0.06em]">Outreach Sequence</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center h-8 px-3 rounded-nav-item bg-muted-panel text-text-primary cursor-pointer">
                <Mail size={14} className="mr-3 shrink-0 text-text-primary" />
                <span className="text-[14px] truncate">New email</span>
              </div>
              <div className="flex items-center h-8 px-3 rounded-nav-item text-text-secondary hover:bg-muted-panel cursor-pointer group">
                <Plus size={14} className="mr-3 shrink-0 text-text-muted group-hover:text-text-secondary" />
                <span className="text-[14px] truncate">Add step</span>
              </div>
              <div className="flex items-center h-8 px-3 rounded-nav-item text-red-main hover:bg-red-main/5 cursor-pointer group">
                <Trash2 size={14} className="mr-3 shrink-0 opacity-80" />
                <span className="text-[14px] truncate">Clear all</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border-soft" />

          <div>
            <div className="px-3 mb-3">
               <span className="text-[11px] font-semibold text-text-faint uppercase tracking-[0.06em]">After Candidate Replies</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center h-8 px-3 rounded-nav-item text-text-secondary hover:bg-muted-panel cursor-pointer">
                <CheckCircle2 size={14} className="mr-3 shrink-0 text-green-main" />
                <span className="text-[14px] truncate">Candidate is interested</span>
              </div>
              <div className="flex items-center h-8 px-3 rounded-nav-item text-text-secondary hover:bg-muted-panel cursor-pointer">
                <XCircle size={14} className="mr-3 shrink-0 text-red-main" />
                <span className="text-[14px] truncate">Candidate is not interested</span>
              </div>
              <div className="flex items-center h-8 px-3 rounded-nav-item text-text-secondary hover:bg-muted-panel cursor-pointer">
                <Clock size={14} className="mr-3 shrink-0 text-orange-main" />
                <span className="text-[14px] truncate">Candidate stops responding</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 shrink-0">
          <div className="flex items-center h-8 px-3 rounded-nav-item text-text-secondary hover:bg-muted-panel cursor-pointer group">
             <MoreHorizontal size={14} className="mr-3 shrink-0 text-text-muted group-hover:text-text-secondary" />
             <span className="text-[14px] truncate">Outreach preferences</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

const EmailCard = () => {
  return (
    <div className="rounded-[24px] bg-muted-panel p-[16px] sm:p-[18px] border border-border-soft inset-glass-shadow">
      <div className="flex items-center h-7 mb-4">
        <Mail size={14} className="text-text-secondary mr-2 shrink-0" />
        <span className="text-[13px] font-medium text-text-secondary truncate">New email, scheduled</span>
        <Trash2 size={14} className="ml-auto shrink-0 text-red-main cursor-pointer hover:opacity-80 transition-opacity" />
      </div>

      <div className="bg-card-background border border-[#EDEDE9] rounded-[18px] p-[16px] sm:p-[16px_18px]">
        <div className="flex items-center min-h-[28px] text-[14px] flex-wrap gap-2">
          <span className="w-16 shrink-0 text-text-muted">From:</span>
          <span className="text-text-primary truncate min-w-0">andrewhite@gmail.com</span>
        </div>
        <div className="flex items-center min-h-[28px] text-[14px] mb-3 flex-wrap gap-2">
          <span className="w-16 shrink-0 text-text-muted">Subject:</span>
          <span className="text-text-primary font-medium truncate min-w-0">Software Engineer</span>
        </div>
        
        <div className="h-[1px] bg-[#EFEBE6] -mx-[16px] sm:-mx-[18px]" />

        <div className="pt-[18px] text-[14px] leading-[20px] text-text-primary space-y-4">
          <p>Hi, Joaqin!</p>
          <p>
            I came across your profile and was really impressed by your background. I think you&apos;d be strong candidates for our Software Engineer position. I&apos;d love to connect and share more about the opportunity if you&apos;re open to it. Would you be available for a quick call sometime this week?
          </p>
          <p>
            Best regrads,<br />
            Andrew White.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E7E7E3] flex flex-wrap gap-4 items-center justify-between">
        <button className="flex items-center text-orange-main font-semibold text-[13px] hover:opacity-80 transition-opacity whitespace-nowrap">
          <Plus size={14} className="mr-1.5" />
          Add variable
        </button>
        <button className="flex items-center text-text-primary font-semibold text-[13px] hover:opacity-80 transition-opacity whitespace-nowrap">
          <Play size={14} className="mr-1.5" />
          Preview
        </button>
      </div>
    </div>
  );
};

const AddStepCard = () => {
  const steps = [
    { label: 'New email thread', icon: Mail, color: 'bg-orange-main' },
    { label: 'Reply to previous email', icon: MessageSquare, color: 'bg-purple-main' },
    { label: 'LinkedIn message', icon: Linkedin, color: 'bg-blue-linkedin', helper: 'Only one LinkedIn message per sequence' },
    { label: 'LinkedIn connection request', icon: Linkedin, color: 'bg-blue-linkedin', helper: 'Only one LinkedIn connection request per sequence' },
    { label: 'Text message', icon: MessageCircle, color: 'bg-green-main' },
    { label: 'Custom task', icon: Zap, color: 'bg-teal-main' },
  ];

  return (
    <div className="mt-[18px] rounded-[24px] bg-muted-panel p-[12px] sm:p-[16px_18px] border border-border-soft">
      <div className="h-[30px] mb-3 flex items-center">
        <Plus size={14} className="mr-2 text-text-secondary shrink-0" />
        <span className="text-[14px] font-medium text-text-primary">Add new step</span>
      </div>

      <div className="bg-card-background rounded-[18px] border border-[#EDEDE9] overflow-hidden">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className={`min-h-[54px] py-2 sm:py-0 flex sm:grid sm:grid-cols-[28px_1fr_auto] items-center px-[14px] sm:px-[18px] cursor-pointer hover:bg-[#FAFAF8] transition-colors ${idx !== steps.length - 1 ? 'border-bottom border-[#EFEBEB]' : ''}`}
            style={{ borderBottomWidth: idx !== steps.length - 1 ? '1px' : '0px' }}
          >
            <div className={`w-[24px] h-[24px] shrink-0 rounded-[6px] ${step.color} flex items-center justify-center text-white`}>
              <step.icon size={12} fill="currentColor" className={step.icon === Linkedin ? 'fill-white' : ''} />
            </div>
            <span className="ml-3 sm:ml-3 text-[14px] text-text-primary flex-1">{step.label}</span>
            {step.helper && (
              <span className="text-[12px] sm:text-[13px] text-text-muted mt-1 sm:mt-0 ml-[39px] sm:ml-4 sm:text-right hidden md:block max-w-[150px] lg:max-w-none truncate">{step.helper}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleCard = () => {
  const days = [
    { name: 'Sun', active: false },
    { name: 'Mon', active: true },
    { name: 'Tue', active: true },
  ];

  return (
    <div className="mt-[18px] rounded-[24px] bg-muted-panel p-[12px] sm:p-[16px_18px_22px] border border-border-soft mb-8">
      <div className="h-[30px] mb-4 flex items-center">
        <Clock size={14} className="mr-2 text-text-secondary shrink-0" />
        <span className="text-[14px] font-medium text-text-primary">Schedule email</span>
      </div>

      <div className="bg-card-background rounded-[18px] border border-[#EDEDE9] p-3 sm:p-4 space-y-4">
        {days.map((day, idx) => (
          <div key={idx} className="flex items-center min-h-[40px]">
            <span className="w-10 sm:w-12 text-[13px] font-medium text-text-secondary shrink-0">{day.name}</span>
            <div className="flex-1 mx-2 sm:mx-4 relative h-6 min-w-0">
               {/* Background grid indicators */}
               <div className="absolute inset-0 flex justify-between px-1 opacity-10 hidden sm:flex">
                 {Array.from({ length: 24 }).map((_, i) => (
                   <div key={i} className="w-[1px] h-full bg-text-muted" />
                 ))}
               </div>
               
               {day.active && (
                 <div className="absolute left-[5%] right-[5%] sm:left-[30%] sm:right-[10%] h-6 bg-orange-main rounded-full flex items-center px-3 sm:px-4 justify-between text-white text-[10px] sm:text-[11px] font-bold overflow-hidden">
                   <span>8 AM</span>
                   <span>8 PM</span>
                 </div>
               )}
            </div>
            <div 
              className={`w-[36px] h-[20px] rounded-full p-0.5 shrink-0 cursor-pointer transition-colors ${day.active ? 'bg-orange-main' : 'bg-[#E7E7E3]'}`}
            >
              <div className={`w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${day.active ? 'translate-x-[16px]' : 'translate-x-0'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function Dashboard() {
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true);
  const [isSequenceOpen, setIsSequenceOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsPrimaryOpen(false);
        setIsSequenceOpen(false);
      } else {
        setIsPrimaryOpen(true);
        setIsSequenceOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen p-0 md:p-4 lg:p-page-padding flex items-center justify-center overflow-hidden bg-page-background">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[1440px] h-screen md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-108px)] bg-app-background md:rounded-app-shell md:border border-white/45 overflow-hidden flex md:shadow-2xl relative"
      >
        {/* Mobile Overlay */}
        {(isPrimaryOpen || isSequenceOpen) && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 lg:hidden" 
            onClick={() => { setIsPrimaryOpen(false); setIsSequenceOpen(false); }} 
          />
        )}

        <PrimarySidebar 
          isOpen={isPrimaryOpen} 
          onToggle={() => setIsPrimaryOpen(!isPrimaryOpen)} 
        />
        <SequenceSidebar 
          isOpen={isSequenceOpen} 
          onToggle={() => setIsSequenceOpen(!isSequenceOpen)} 
        />
        
        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col min-w-0 relative">
          
          {/* Desktop Toggles Overlay (absolute positioned over scrollable area) */}
          <div className="hidden lg:block sticky top-0 z-10 w-full h-0 overflow-visible">
            <div className="absolute top-4 left-4 flex gap-2">
              {!isPrimaryOpen && (
                <button onClick={() => setIsPrimaryOpen(true)} className="p-2 text-text-secondary hover:text-text-primary bg-white rounded-md border border-border-soft shadow-sm bg-white/80 backdrop-blur-sm" title="Open Workflow Menu">
                  <Menu size={16} />
                </button>
              )}
              {isPrimaryOpen && !isSequenceOpen && (
                <button onClick={() => setIsSequenceOpen(true)} className="p-2 text-text-secondary hover:text-text-primary bg-white rounded-md border border-border-soft shadow-sm bg-white/80 backdrop-blur-sm" title="Open Sequence Menu">
                  <Menu size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden h-[54px] shrink-0 border-b border-border-soft flex items-center justify-between px-4 sticky top-0 bg-app-background/90 backdrop-blur-sm z-20">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsPrimaryOpen(true)} className="p-1.5 -ml-1.5 text-text-secondary hover:text-text-primary rounded-md hover:bg-black/5">
                <Menu size={20} />
              </button>
              <span className="font-semibold text-[15px]">Sequence Editor</span>
            </div>
            <button onClick={() => setIsSequenceOpen(true)} className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary p-1.5 -mr-1.5 rounded-md hover:bg-black/5">
              <span className="text-[12px] font-medium uppercase tracking-wider hidden sm:block">Seq</span>
              <Menu size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 lg:p-[34px_56px_80px] flex justify-center lg:justify-start items-start">
            <div className="w-full max-w-[760px] lg:ml-12 transition-all duration-300">
              <EmailCard />
              <AddStepCard />
              <ScheduleCard />
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

