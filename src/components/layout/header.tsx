import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    document.addEventListener("scroll", onScroll, { passive: true })

    return () => document.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "z-50 h-16 bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60 md:in-data-[slot=sidebar-inset]:rounded-t-xl",
        fixed && "header-fixed peer/header sticky top-0 w-[inherit]",
        offset > 10 && fixed ? "shadow" : "shadow-none",
        className
      )}
      {...props}
    >
      <div className="relative flex h-full items-center gap-3 p-4 sm:gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6 data-vertical:self-center" />
        {children}
      </div>
    </header>
  )
}
