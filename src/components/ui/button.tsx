
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-teal text-white shadow-[4px_4px_0px_0px_rgba(255,209,102,0.7)] hover:shadow-[4px_4px_0px_0px_rgba(255,113,91,0.7)]",
        destructive:
          "bg-teal text-white shadow-[4px_4px_0px_0px_rgba(255,209,102,0.7)] hover:shadow-[4px_4px_0px_0px_rgba(255,113,91,0.7)]",
        outline:
          "bg-teal text-white shadow-[4px_4px_0px_0px_rgba(255,209,102,0.7)] hover:shadow-[4px_4px_0px_0px_rgba(255,113,91,0.7)]",
        secondary:
          "bg-teal text-white shadow-[4px_4px_0px_0px_rgba(255,209,102,0.7)] hover:shadow-[4px_4px_0px_0px_rgba(255,113,91,0.7)]",
        ghost: "hover:bg-teal/10 hover:text-teal",
        link: "text-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
