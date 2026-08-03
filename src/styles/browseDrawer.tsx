export const browseDrawerStyles = {
  container:
    "flex min-h-screen w-full flex-col gap-3 overflow-x-hidden bg-[#FCFBF9]",

  input:
    "hidden peer",

  label:
    "block w-full cursor-pointer",

  card:
    "flex w-full items-center justify-between gap-3 rounded-xl border border-[#E8E5DE] bg-white p-3 transition-all duration-200 hover:border-[#D8D3C8] hover:shadow-sm peer-checked:border-[#E2793D] peer-checked:bg-[#FFF8F3] peer-checked:ring-2 peer-checked:ring-[#FCE8D8]",

  cardItem:
    "flex min-w-0 flex-1 items-center gap-2",

  cardTitle:
    "truncate text-[13px] font-semibold text-[#2F2A25]",

  cardBadge:
    "shrink-0 rounded-full border border-[#F4D5BE] bg-[#FCE8D8] px-2 py-0.5 text-[10px] font-semibold text-[#C4632E]",

  cardInfo:
    "shrink-0 rounded-full bg-[#F7F6F3] px-2.5 py-1 text-xs font-semibold text-[#5F584F]",

  addonsContainer:
    "flex w-full items-center justify-between gap-3 rounded-xl border border-[#E8E5DE] bg-white p-3 transition-all duration-200 hover:border-[#D8D3C8] hover:shadow-sm",

  drawerHeader:
    "mb-3 w-full text-center text-sm font-semibold text-[#2F2A25]",

  noOptions:
    "w-full rounded-xl border border-dashed border-[#D8D3C8] bg-[#F7F6F3] p-4 text-center text-xs font-medium text-[#8C8676]",

  addonsTitle:
    "min-w-0 flex-1 truncate text-[13px] font-semibold text-[#2F2A25]",

  addonsPrice:
    "shrink-0 rounded-full bg-[#FCE8D8] px-2.5 py-1 text-xs font-semibold text-[#C4632E]",

  loadingContainer:
    "flex h-screen items-center justify-center",

  errorMessage:
    "text-xs font-medium text-[#B84A44]",

  drawerContent:
    "w-[90vw] max-w-[400px] overflow-x-hidden bg-[#FCFBF9] p-4",

  drawerContentLoading:
    "flex h-screen items-center justify-center bg-[#FCFBF9]",

  errorLoadingMessage:
    "mt-2 rounded-xl border border-[#E8B4B0] bg-[#FFF5F4] p-3 text-center text-xs font-medium text-[#B84A44]",
};