import type { CircularProgressProps } from "../../types";

export default function CircularProgress({children,variant="primary", value, max, size=48}: CircularProgressProps){
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
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={getVariantStyles(variant)} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition: 'stroke-dashoffset 0.3s ease'}} />
      </svg>
    </div>
  )
}

function getVariantStyles(variant: "primary" | "secondary" | "success" | "warning" | "error"){
  switch (variant){
    case "primary":
      return "var(--primary)"
    case "secondary":
      return "var(--text-tertiary)"
    case "success":
      return "var(--success)"
    case "warning":
      return "var(--warning)"
    case "error":
      return "var(--error)"
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`)
  }
}