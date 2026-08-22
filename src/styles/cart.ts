export const cartStyles = {
  page: "min-h-screen w-full bg-[#FCFBF9] text-[#1E1B16]",

  container: "mx-auto w-full max-w-7xl",

  cartLayout:
    "grid w-full grid-cols-1 gap-6 px-5 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:px-0",

  itemsColumn: "min-w-0 w-full",

  summaryColumn: "min-w-0 w-full lg:sticky lg:top-6 lg:self-start",

  itemsContainer: "flex flex-col gap-4",

  content:
    "grid grid-cols-1 gap-6 px-4 pb-24 pt-5 sm:px-6 lg:grid-cols-[minmax(0,48rem)_360px] lg:justify-center lg:px-8",

  cartItem:
    "rounded-2xl border border-[#E8E5DE] bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5",

  itemMain: "flex gap-4",

  itemImage: "h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28",

  itemInfo: "min-w-0 flex-1",

  itemHeader: "flex items-start justify-between gap-3",

  itemName: "text-base font-semibold text-[#2F2A25] sm:text-lg",

  itemPrice: "shrink-0 text-sm font-semibold text-[#C4632E] sm:text-base",

  itemDescription: "mt-1 text-sm leading-5 text-[#7B756C]",

  specialInstructions: "mt-2 text-xs leading-5 text-[#8C8676]",

  itemFooter:
    "mt-4 flex items-center justify-between border-t border-[#EEEAE4] pt-4",

  quantityLabel: "text-xs font-medium uppercase tracking-wide text-[#8C8676]",

  quantityControls: "mt-1 flex items-center gap-3",

  quantityButton:
    "flex h-8 w-8 items-center justify-center rounded-full border border-[#D8D3CC] bg-white text-[#5F584F] transition-colors hover:border-[#E2793D] hover:bg-[#FFF8F3] hover:text-[#C4632E]",

  quantityValue:
    "min-w-[20px] text-center text-sm font-semibold text-[#2F2A25]",

  editButton:
    "text-xs font-semibold text-[#C4632E] transition-colors hover:text-[#E2793D]",

  emptyCart:
    "rounded-2xl border border-dashed border-[#D8D3C8] bg-white p-8 text-center",

  emptyCartTitle: "text-base font-semibold text-[#2F2A25]",

  emptyCartDescription: "mt-1.5 text-sm leading-5 text-[#8C8676]",

  summaryPlaceholder:
    "rounded-2xl border border-[#E8E5DE] bg-white p-5 shadow-sm",

  customizations: "mt-3 flex flex-col gap-2",

  customizationGroup: "flex flex-wrap items-center gap-2",

  customizationLabel: "shrink-0 text-[11px] font-medium text-[#8C8676]",

  customizationList: "flex flex-wrap gap-1.5",

  customizationTag:
    "rounded-full bg-[#F7F3EE] px-2.5 py-1 text-[11px] font-medium text-[#5F584F]",

  optionsContainer: "mt-3 rounded-xl bg-[#F7F6F3] px-3 py-2.5",

  optionsList: "flex flex-wrap gap-1.5 mt-2",

  optionRow:
    "flex w-fit max-w-full items-center gap-1.5 rounded-full bg-white px-2.5 py-1",

  optionName: "text-[11px] text-[#8C8676]",

  optionValue: "text-[11px] font-semibold text-[#5F584F]",

  drawerPaper: "w-full sm:w-[400px]",

  drawerContent: "flex h-full w-full flex-col",

  actions:
    "flex shrink-0 items-center gap-1.5",

  actionButton:
    "flex h-8 w-8 items-center justify-center rounded-lg text-[#7B756C] transition-colors hover:bg-[#F5F2ED] hover:text-[#C4632E] focus:outline-none focus:ring-2 focus:ring-[#E2793D]/30",

  deleteButton:
    "hover:bg-[#FEF0EC] hover:text-[#C4632E]",
};

export const cartInfoStyles = {
  container: "w-full pt-2 pb-5",

  headingContainer: "mb-5",

  title: "text-xl font-semibold leading-tight text-[#1E1B16] sm:text-2xl",

  meta: "mt-1.5 flex items-center gap-2 text-sm text-[#7B756C]",

  dot: "text-[#E2793D]",

  banner:
    "flex w-full max-w-2xl items-center gap-3 rounded-xl border border-[#F1E4D7] bg-[#FFF9F3] px-4 py-3",

  bannerIcon:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCE8D8] text-[#E2793D]",

  bannerText: "text-xs font-medium leading-5 text-[#5F584F] sm:text-sm",
};

export const orderSummaryStyles = {
  container:
    "w-full rounded-2xl border border-[#E8E4DE] bg-white p-5 shadow-sm",

  title: "text-lg font-semibold text-[#1E1B16]",

  breakdown: "mt-5 space-y-3",

  row: "flex items-center justify-between text-sm text-[#7B756C]",

  totalRow:
    "mt-5 flex items-center justify-between border-t border-[#E8E4DE] pt-5 text-base font-semibold text-[#1E1B16]",

  checkoutButton:
    "mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E2793D] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D96F35] active:scale-[0.99]",

  continueButton:
    "mt-3 w-full rounded-xl border border-[#D8D3CC] bg-[#FCFBF9] px-4 py-3 text-sm font-semibold text-[#5F584F] transition-colors hover:bg-[#F5F2ED]",
};

export const cartNoticesStyles = {
  container: "mt-4 flex w-full flex-col gap-3",

  notice:
    "flex w-full items-start gap-3 rounded-xl border border-[#E8E4DE] bg-white p-4",

  icon: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCE8D8] text-[#E2793D]",

  title: "text-xs font-semibold text-[#2F2A25]",

  description: "mt-1 text-[11px] leading-4 text-[#8C8676]",
};

export const emptyCartStyles = {
  container:
    "flex min-h-[60vh] w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-0",

  card: "flex w-full max-w-md flex-col items-center text-center",

  icon: "flex h-16 w-16 items-center justify-center rounded-full bg-[#FCE8D8] text-[#E2793D]",

  title: "mt-5 text-xl font-semibold text-[#1E1B16] sm:text-2xl",

  description: "mt-2 max-w-sm text-sm leading-6 text-[#7B756C]",

  button:
    "mt-6 rounded-xl bg-[#E2793D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D96F35] active:scale-[0.99]",
};
