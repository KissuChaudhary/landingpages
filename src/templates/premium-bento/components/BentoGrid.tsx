'use client';

import LiveCohortCard from './cards/LiveCohortCard';
import CourseModulesCard from './cards/CourseModulesCard';
import WeeklyTasksCard from './cards/WeeklyTasksCard';
import PrivateCommunityCard from './cards/PrivateCommunityCard';
import QASupportCard from './cards/QASupportCard';
import PersonalizedFeedbackCard from './cards/PersonalizedFeedbackCard';
import BonusMaterialCard from './cards/BonusMaterialCard';

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
      {/* Top Row: 4 items */}
      <div className="md:col-span-6 lg:col-span-3 h-[340px]">
        <LiveCohortCard />
      </div>
      <div className="md:col-span-6 lg:col-span-3 h-[340px]">
        <CourseModulesCard />
      </div>
      <div className="md:col-span-6 lg:col-span-3 h-[340px]">
        <WeeklyTasksCard />
      </div>
      <div className="md:col-span-6 lg:col-span-3 h-[340px]">
        <PrivateCommunityCard />
      </div>

      {/* Bottom Row: 3 items */}
      <div className="md:col-span-12 lg:col-span-4 h-[340px]">
        <QASupportCard />
      </div>
      <div className="md:col-span-6 lg:col-span-4 h-[340px]">
        <PersonalizedFeedbackCard />
      </div>
      <div className="md:col-span-6 lg:col-span-4 h-[340px]">
        <BonusMaterialCard />
      </div>
    </div>
  );
}
