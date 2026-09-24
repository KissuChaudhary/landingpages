import { LiveCohortCard } from "@/templates/motion-bento/components/bento/LiveCohortCard";
import { CourseModulesCard } from "@/templates/motion-bento/components/bento/CourseModulesCard";
import { WeeklyTasksCard } from "@/templates/motion-bento/components/bento/WeeklyTasksCard";
import { CommunityCard } from "@/templates/motion-bento/components/bento/CommunityCard";
import { SupportCard } from "@/templates/motion-bento/components/bento/SupportCard";
import { FeedbackCard } from "@/templates/motion-bento/components/bento/FeedbackCard";
import { BonusMaterialCard } from "@/templates/motion-bento/components/bento/BonusMaterialCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] relative overflow-hidden flex items-center justify-center p-8 font-sans">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] -translate-y-1/2" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-6xl w-full relative z-10 flex flex-col gap-6">
        {/* Top Row: 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[340px]">
          <LiveCohortCard />
          <CourseModulesCard />
          <WeeklyTasksCard />
          <CommunityCard />
        </div>

        {/* Bottom Row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto lg:h-[340px] lg:px-16">
          <SupportCard />
          <FeedbackCard />
          <BonusMaterialCard />
        </div>
      </div>
    </div>
  );
}
