import type { CircularProgressProps } from "../../types";

export default function CircularProgress({children, value, max, size=48}: CircularProgressProps){
  const progress = max > 0 ? value / max : 0;
  const stroke = 4;
  const radius= (size-stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1-progress);

  return(
    <div className="relative w-[48px] h-[48px] flex items-center justify-center">
      <span className="absolute inset-0 flex items-center justify-center">
        {children}
      </span>
      <svg width={size} height={size} className="circular-progress">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--primary)" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition: 'stroke-dashoffset 0.3s ease'}} />
      </svg>
    </div>
  )
}