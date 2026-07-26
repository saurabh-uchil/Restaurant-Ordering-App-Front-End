const restaurantInfoStyle = {
  container:
    "flex items-center justify-between gap-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm",

  content: "flex flex-1 items-center gap-6",

  image:
    "h-36 w-48 rounded-2xl object-cover bg-stone-100 border border-stone-200",

  details: "flex flex-col",

  welcome:
    "text-sm font-medium text-gray-500 mb-2",

  title:
    "text-4xl font-bold text-gray-900 mb-3",

  description:
    "max-w-xl text-base leading-7 text-gray-600",

  actions:
    "flex flex-col gap-4",

  primaryButton:
    "rounded-xl bg-[#E2793D] px-6 py-3 text-white font-semibold transition hover:bg-[#cc6932]",

  secondaryButton:
    "rounded-xl border border-stone-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-stone-50",
};

export default restaurantInfoStyle;