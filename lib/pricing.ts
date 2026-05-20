export const WEBSITE_TYPES = [
  {
    id:       "static",
    label:    "Static website",
    desc:     "3–5 pages, contact form",
    price:    4000,
    icon:     "🖥️",
  },
  {
    id:       "dynamic",
    label:    "Dynamic / CMS",
    desc:     "5–10 pages, blog, editable",
    price:    10000,
    icon:     "⚙️",
  },
  {
    id:       "ecommerce",
    label:    "E-commerce",
    desc:     "Shop, cart, checkout",
    price:    18000,
    icon:     "🛒",
  },
  {
    id:       "custom",
    label:    "Custom",
    desc:     "Let's talk",
    price:    null,
    icon:     "⚡",
  },
] as const

export type WebsiteTypeId = (typeof WEBSITE_TYPES)[number]["id"]

export const ADDONS = [
  {
    id:      "google",
    label:   "Google Ads",
    desc:    "Campaign setup + daily management",
    price:   2500,
    color:   "from-blue-500/10 to-blue-600/5",
    border:  "border-blue-500/20",
    active:  "border-blue-500/50 bg-blue-500/10",
    dot:     "bg-blue-400",
  },
  {
    id:      "meta",
    label:   "Meta Ads",
    desc:    "Facebook + Instagram ads",
    price:   2000,
    color:   "from-pink-500/10 to-pink-600/5",
    border:  "border-pink-500/20",
    active:  "border-pink-500/50 bg-pink-500/10",
    dot:     "bg-pink-400",
  },
  {
    id:      "seo",
    label:   "SEO",
    desc:    "Keywords, on-page, monthly report",
    price:   3500,
    color:   "from-green-500/10 to-green-600/5",
    border:  "border-green-500/20",
    active:  "border-green-500/50 bg-green-500/10",
    dot:     "bg-green-400",
  },
] as const

export type AddonId = (typeof ADDONS)[number]["id"]

export const GROWTH_MESSAGES: Record<number, string> = {
  0: "Add ads or SEO to start getting traffic",
  1: "Good start — one channel driving growth",
  2: "Strong setup — two channels working together",
  3: "Full growth stack — maximum visibility",
}