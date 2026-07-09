import type { ComponentProps } from "react"

type Variant = "primary"|"secondary"|"danger"

type ButtonProps = {
  variant?: Variant
} & ComponentProps<"button">

export default function Button({variant="secondary",className, ...props}: ButtonProps){
  return (
    <button {...props} className={`${getVariantStyles(variant)} button disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${className}`} disabled={props.disabled}>{props.children}</button>
  )
}

function getVariantStyles(variant: Variant){
  switch (variant){
    case "primary":
      return "bg-(--primary) hover:bg-(--primary-hover)"
    case "secondary":
      return "bg-(--text-tertiary) hover:bg-(--text-secondary)"
    case "danger":
      return "bg-(--danger) hover:opacity-70"
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`)
  }

}