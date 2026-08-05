export const notificationStyles = {
  container:
    "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-[13px] font-medium shadow-sm",

  content:
    "flex min-w-0 items-center gap-2",

  icon:
    "shrink-0",

  closeButton:
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200 hover:bg-black/5",

  variants: {
    success:
      "border-[#CFE3D4] bg-[#F3F8F4] text-[#477052]",

    error:
      "border-[#E8C7C3] bg-[#FFF5F4] text-[#B84A44]",

    warning:
      "border-[#F1D6A8] bg-[#FFF9EE] text-[#9A6825]",

    info:
      "border-[#D9D5CC] bg-[#F7F6F3] text-[#5F584F]",
  },
};