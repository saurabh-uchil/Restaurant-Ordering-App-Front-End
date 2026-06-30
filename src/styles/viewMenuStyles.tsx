export const viewMenuStyles = {
    cardContainer: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    cardGridCols:"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}

export const menuCardStyles = {
  card:
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",

  imageContainer:
    "relative aspect-[4/3] overflow-hidden bg-gray-100",

  image:
    "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",

  imageAction:
  "absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-semibold text-gray-900 shadow-lg transition hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
  content:
    "flex flex-1 flex-col p-5",

  header:
    "mb-3 flex items-start justify-between gap-3",

  title:
    "line-clamp-2 text-lg font-semibold tracking-tight text-gray-900",

  price:
    "rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white whitespace-nowrap",

  description:
    "mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600",

  dietaryContainer:
    "mb-6 flex flex-wrap items-center gap-2",

  dietaryText:
    "w-full text-xs font-semibold uppercase tracking-wider text-gray-500",

  dietaryBadge:
    "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700",

  button:
    "mt-auto inline-flex h-11 items-center justify-center rounded-xl bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-[0.98]",

  loadingContainer: "flex items-center justify-center h-screen",
  
  errorContainer: "flex items-center justify-center h-screen",

  errorLoadingMessage:"text-red-700 mt-2 bg-red-100 border border-red-200 p-3 rounded-xl text-center text-sm font-medium"
};