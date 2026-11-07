
export const styles = {
  overlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",

  dialog:
    "relative w-full max-w-lg rounded-2xl border border-[#343434] bg-[#1C1C1C] p-8 shadow-2xl",

  closeButton:
    "absolute right-5 top-5 text-gray-400 transition-colors hover:text-white",

  iconWrapper:
    "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9632B]/10 text-[#C9632B]",

  title:
    "mb-3 text-center text-2xl font-semibold text-white",

  description:
    "mb-3 text-center text-sm leading-relaxed text-gray-400",

  table:
    "font-semibold text-[#C9632B]",

  actions:
    "mt-8 flex flex-col-reverse gap-3 sm:flex-row",

  cancelButton:
    "flex-1 rounded-full border border-[#444444] bg-transparent px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-[#C9632B] hover:text-white",

  joinButton:
    "flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#C9632B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B95725]",
};
