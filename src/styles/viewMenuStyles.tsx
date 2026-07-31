export const viewMenuStyles = {
    cardContainer: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    cardGridCols:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}

export const menuCardStyles = {
  card:
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ECE5DC] bg-[#FFFEFC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",

  imageContainer:
  "relative aspect-[16/10] overflow-hidden bg-[#F8F5F1]",

  image:
    "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",

  imageAction:
    "absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFEFC] text-2xl font-semibold text-[#2F2A25] shadow-lg transition hover:scale-105 hover:bg-[#FFF5EE] focus:outline-none focus:ring-2 focus:ring-[#E2793D]/20",

  content:
    "flex flex-1 flex-col p-4",

  header:
    "mb-2 flex items-start justify-between gap-3",

  title:
    "line-clamp-2 text-base font-semibold tracking-tight text-[#2F2A25]",

  price:
    "whitespace-nowrap rounded-full bg-[#3F3A36] px-3 py-1 text-sm font-semibold text-white",

  description:
    "mb-3 line-clamp-2 text-sm leading-relaxed text-[#8B8177]",

  dietaryContainer:
    "mb-4 flex flex-wrap items-center gap-2",

  dietaryText:
    "w-full text-xs font-semibold uppercase tracking-wider text-[#8B8177]",

  dietaryBadge:
    "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700",

  button:
    "mt-auto inline-flex h-11 items-center justify-center rounded-xl bg-[#E2793D] px-4 text-sm font-medium text-white transition hover:bg-[#C9662F] focus:outline-none focus:ring-2 focus:ring-[#E2793D]/20 active:scale-[0.98]",

  loadingContainer:
    "flex items-center justify-center h-screen",

  errorContainer:
    "flex items-center justify-center h-screen",

  errorLoadingMessage:
    "text-red-700 mt-2 bg-red-100 border border-red-200 p-3 rounded-xl text-center text-sm font-medium",
};