export const notificationStyles = {
  container:
    "fixed top-20 right-5 z-50 flex w-[calc(100%-2rem)] max-w-[380px] items-center justify-between gap-3 rounded-xl border px-4 py-3.5 shadow-lg backdrop-blur-sm sm:right-6",

  content:
    "flex min-w-0 items-center gap-3",

  textContainer:
    "flex min-w-0 flex-col items-start gap-1",

  title:
    "text-sm font-semibold leading-5",

  iconContainer:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",

  message:
    "text-[13px] font-medium leading-5",

  actionButton:
    "mt-1 inline-flex min-h-9 items-center justify-center rounded-full bg-[#E2793D] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#D96F35] focus:outline-none focus:ring-2 focus:ring-[#E2793D]/40 disabled:cursor-not-allowed disabled:opacity-60",

  icon:
    "shrink-0",

  closeButton:
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-black/5",

  variants: {
    success:
      "border-[#D6E5D9] bg-[#F7FBF8] text-[#41694B]",

    error:
      "border-[#EBCBC7] bg-[#FFF7F6] text-[#A94741]",

    warning:
      "border-[#EEDDBB] bg-[#FFFBF3] text-[#8A632A]",

    info:
      "border-[#E8E5DE] bg-[#FCFBF9] text-[#5F584F]",
  },

  iconVariants: {
    success:
      "bg-[#E5F1E8] text-[#477052]",

    error:
      "bg-[#F9E5E3] text-[#B84A44]",

    warning:
      "bg-[#F8EDD8] text-[#9A6825]",

    info:
      "bg-[#F0EEE9] text-[#6B655B]",
  },
};
