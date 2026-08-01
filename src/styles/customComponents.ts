export const inputStyles = {
    label: "mb-1 block text-[13px] font-semibold text-[#2F2A25]",
    input: "h-11 w-full rounded-lg border border-[#E8E5DE] bg-white px-4 text-sm text-[#2F2A25] placeholder:text-[#8C8676] outline-none transition-all duration-200 hover:border-[#D8D3C8] focus:border-[#E2793D] focus:ring-4 focus:ring-[#FCE8D8]",
    error: "mt-1 text-xs font-medium text-[#B84A44]",
}

export const buttonStyles: Record<string, string> = {
    base: "inline-flex items-center gap-2 px-4 py-2 rounded-md",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-900 text-white hover:bg-gray-600",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    transparent: "bg-transparent border border-gray-600 text-gray-800 hover:bg-gray-100",
    transparentGreen:"bg-transparent border border-emerald-600 text-emerald-800 hover:bg-emerald-100",
    transparentRed:"bg-transparent border border-red-600 text-red-800 hover:bg-red-100",
    form: "bg-[#FCE8D8] text-[#C4632E] border border-[#F4D5BE] hover:bg-[#F7DDCA] hover:border-[#EBC4A7] focus:ring-2 focus:ring-[#E2793D]/20",
    formPrimary: "bg-[#E2793D] text-white hover:bg-[#C4632E] focus:ring-2 focus:ring-[#E2793D]/20",
    formDanger: "border border-[#E8B4B0] bg-[#FFF5F4] text-[#B84A44] hover:border-[#D98A84] hover:bg-[#FDE8E6] focus:ring-2 focus:ring-[#D95C5C]/20",
}

export const buttonTextStyles: Record<string, string> = {
 form: "text-xs font-medium text-[#C4632E] whitespace-nowrap",
 formPrimary: "text-sm font-semibold text-white whitespace-nowrap",
 formDanger: "text-sm font-semibold text-[#B84A44] whitespace-nowrap",
}

export const textareaStyles = {
  container:"w-full",

  label: "mb-1 block text-[13px] font-semibold text-[#2F2A25]",

  textarea: "h-32 w-full resize-y rounded-lg border border-[#E8E5DE] bg-white px-4 py-3 text-sm text-[#2F2A25] placeholder:text-[#8C8676] outline-none transition-all duration-200 hover:border-[#D8D3C8] focus:border-[#E2793D] focus:ring-4 focus:ring-[#FCE8D8]",

  error: "mt-1 text-xs font-medium text-[#B84A44]",
};

export const selectStyles = {
  container: "mb-4 w-full",

  label: "mb-1 block text-[13px] font-semibold text-[#2F2A25]",

  select: "h-11 w-full rounded-lg border border-[#E8E5DE] bg-white px-4 text-sm font-normal text-[#2F2A25] outline-none transition-all duration-200 hover:border-[#D8D3C8] focus:border-[#E2793D] focus:ring-4 focus:ring-[#FCE8D8]",

  placeholder: "text-[#8C8676]",

  option: "text-sm font-normal text-[#2F2A25]",

  error:"mt-1 text-xs font-medium text-[#B84A44]",
};

export const checkboxStyles = {
  container:
    "mb-3 mt-2",

  label:
    "flex cursor-pointer select-none items-center gap-2",

  checkbox:
    "h-4 w-4 cursor-pointer rounded border-[#D8D3C8] text-[#E2793D] accent-[#E2793D] focus:ring-2 focus:ring-[#FCE8D8] focus:ring-offset-0",

  text:
    "text-[13px] font-medium text-[#2F2A25]",

  error:
    "mt-1 text-xs font-medium text-[#B84A44]",
};