import React from 'react';

interface CheckIconProps {
  active?: boolean;
}

const CheckIcon: React.FC<CheckIconProps> = ({ active = false }) => {
  return (
    <div className={`
      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
      ${active ? 'bg-[#89a89d]' : 'bg-[#bccbc5]'}
    `}>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default CheckIcon;