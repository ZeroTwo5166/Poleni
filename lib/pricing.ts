export const WEBSITE_TYPES = [
  {
    id:       "static",
    label:    "Statisk hjemmeside",
    desc:     "3–5 sider, kontaktformular",
    price:    4000,
    icon:     "🖥️",
  },
  {
    id:       "dynamic",
    label:    "Dynamisk / CMS",
    desc:     "5–10 sider, blog, redigerbar",
    price:    10000,
    icon:     "⚙️",
  },
  {
    id:       "ecommerce",
    label:    "Webshop",
    desc:     "Shop, kurv, checkout",
    price:    18000,
    icon:     "🛒",
  },
  {
    id:       "custom",
    label:    "Custom løsning",
    desc:     "Lad os tage en snak",
    price:    null,
    icon:     "⚡",
  },
] as const

export type WebsiteTypeId = (typeof WEBSITE_TYPES)[number]["id"]

export const ADDONS = [
  {
    id:      "google",
    label:   "Google Ads",
    desc:    "Opsætning af kampagner + løbende optimering",
    price:   2500,
    color:   "from-blue-500/10 to-blue-600/5",
    border:  "border-blue-500/20",
    active:  "border-blue-500/50 bg-blue-500/10",
    dot:     "bg-blue-400",
  },
  {
    id:      "meta",
    label:   "Meta Ads",
    desc:    "Facebook- og Instagram-annoncer",
    price:   2000,
    color:   "from-pink-500/10 to-pink-600/5",
    border:  "border-pink-500/20",
    active:  "border-pink-500/50 bg-pink-500/10",
    dot:     "bg-pink-400",
  },
  {
    id:      "seo",
    label:   "SEO",
    desc:    "Søgeord, on-page optimering og månedlig rapport",
    price:   3500,
    color:   "from-green-500/10 to-green-600/5",
    border:  "border-green-500/20",
    active:  "border-green-500/50 bg-green-500/10",
    dot:     "bg-green-400",
  },
] as const

export type AddonId = (typeof ADDONS)[number]["id"]

export const GROWTH_MESSAGES: Record<number, string> = {
  0: "Tilføj annoncering eller SEO for at begynde at få trafik",
  1: "God start — én kanal skaber vækst",
  2: "Stærk opsætning — to kanaler arbejder sammen",
  3: "Komplet vækstpakke — maksimal synlighed",
}

