import React from "react";

export function PremiumCard({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[22px] p-[24px] flex flex-col relative overflow-hidden backdrop-blur-[20px] ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
