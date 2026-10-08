import { BookOpen, CalendarDays, Check, FileText, MoveUpRight } from "lucide-react";
import { Mark } from "@/components/ui/Brand";

export function FeatureVisual({ index }: { index: number }) {
  return (
    <div className={`feature-art feature-art-${index + 1}`} aria-hidden="true">
      {index === 0 && (
        <div className="feature-conversation">
          <div className="feature-prompt">What if I finally made that little idea happen?</div>
          <div className="feature-reply"><Mark /><div><strong>One small beginning.</strong><p>Let’s find a little space in your week. What’s the simplest version you could try?</p><span><Check size={14}/> Your notes are in the conversation</span></div></div>
        </div>
      )}
      {index === 1 && (
        <div className="context-orbit">
          <i className="orbit-ring orbit-ring-outer"/><i className="orbit-ring orbit-ring-inner"/>
          <div className="orbit-center"><Mark /></div>
          <div className="orbit-node orbit-notes"><FileText/><span>Notes</span></div>
          <div className="orbit-node orbit-calendar"><CalendarDays/><span>Calendar</span></div>
          <div className="orbit-node orbit-reading"><BookOpen/><span>Reading</span></div>
          <span className="orbit-caption">A little context. A clearer answer.</span>
        </div>
      )}
      {index === 2 && (
        <div className="feature-planner">
          <div className="feature-planner-head"><strong>A little room to make.</strong><span>Your week <MoveUpRight size={14}/></span></div>
          <div className="planner-week"><span>MON <b>12</b></span><span>TUE <b>13</b></span><span>WED <b>14</b></span><span>THU <b>15</b></span><span>FRI <b>16</b></span></div>
          <div className="planner-hours"><div className="planner-event event-first"><span>09:00</span><strong>First sketch</strong><small>30 minutes, just for you</small></div><div className="planner-event event-second"><span>10:00</span><strong>Build & try</strong><small>One protected hour</small></div></div>
          <div className="feature-planner-note"><Check size={14}/> Two small steps. A real beginning.</div>
        </div>
      )}
      {index === 3 && (
        <div className="feature-output">
          <div className="feature-output-top"><FileText size={18}/><span>Project update</span><MoveUpRight size={17}/></div>
          <strong>A thought, taking shape.</strong>
          <p>The first version is ready to explore. We kept it small, focused on the essentials, and made room for what comes next.</p>
          <p><mark>A good beginning is something you can build on.</mark></p>
          <div className="feature-output-bottom"><Check size={15}/> Ready for your finishing touch</div>
        </div>
      )}
    </div>
  );
}
