const restaurantInfoStyle = {
  container:
    "flex flex-col gap-5 rounded-2xl border border-[#E7DFD5] bg-[#FFFEFC] p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between",

  content:
    "flex flex-col gap-4 sm:flex-row sm:items-center",

  image:
    "h-24 w-full rounded-xl border border-[#E7DFD5] bg-stone-100 object-cover sm:h-24 sm:w-36",

  details:
    "flex flex-col",

  title:
    "font-heading text-xl font-semibold text-[#2F2A25]",

  description:
    "mt-1 max-w-xl text-sm leading-5 text-[#8B8177]",

  metaContainer:
    "mt-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-5",

  address:
    "flex items-center gap-1.5 text-[#8B8177]",

  metaIcon:
    "h-3.5 w-3.5 shrink-0 text-[#A45A2A]",

  status:
    "flex items-center gap-2",

  openDot:
    "h-2 w-2 rounded-full bg-emerald-500",

  closedDot:
    "h-2 w-2 rounded-full bg-red-500",

  openText:
    "font-medium text-emerald-700",

  closedText:
    "font-medium text-red-600",

  actions:
    "flex flex-col gap-2 sm:flex-row lg:flex-col",

  primaryButton:
    "rounded-lg bg-[#E2793D] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#CC6932]",

  secondaryButton:
    "rounded-lg border border-[#E7DFD5] bg-white px-4 py-2 text-sm font-medium text-[#2F2A25] transition-colors duration-200 hover:bg-[#FAF8F5]",
};

export default restaurantInfoStyle;