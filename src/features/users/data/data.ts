import {
  CircleCheck,
  CircleEllipsis,
  CircleMinus,
  CircleX,
  CreditCard,
  Shield,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import { type UserStatus } from "./schema"

export const userStatuses = new Map<
  UserStatus,
  {
    label: string
    icon: LucideIcon
    iconClassName?: string
  }
>([
  [
    "active",
    {
      label: "Active",
      icon: CircleCheck,
      iconClassName: "fill-green-500 text-background",
    },
  ],
  [
    "inactive",
    {
      label: "Inactive",
      icon: CircleMinus,
      iconClassName: "fill-muted-foreground text-background",
    },
  ],
  [
    "invited",
    {
      label: "Invited",
      icon: CircleEllipsis,
      iconClassName: "fill-sky-500 text-background",
    },
  ],
  [
    "suspended",
    {
      label: "Suspended",
      icon: CircleX,
      iconClassName: "fill-destructive text-background",
    },
  ],
])

export const roles = [
  {
    label: "Superadmin",
    value: "superadmin",
    icon: Shield,
  },
  {
    label: "Admin",
    value: "admin",
    icon: UserCheck,
  },
  {
    label: "Manager",
    value: "manager",
    icon: Users,
  },
  {
    label: "Cashier",
    value: "cashier",
    icon: CreditCard,
  },
] as const
