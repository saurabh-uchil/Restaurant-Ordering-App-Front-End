export const cartStyles = {
  page: "min-h-screen w-full bg-[#FCFBF9] text-[#1E1B16]",

  itemsContainer: "flex flex-col gap-4",

  cartItem: "w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm",

  itemMain: "flex gap-4",

  itemImage: "h-24 w-24 shrink-0 rounded-lg object-cover",

  itemInfo: "min-w-0 flex-1",

  itemHeader: "mb-3 flex items-start justify-between gap-3",

  itemName: "text-lg font-semibold text-gray-900",

  actions: "flex shrink-0 items-center gap-1",

  actionButton:
    "flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",

  deleteButton: "hover:bg-red-50 hover:text-red-600",

  priceBreakdown: "mt-4 w-full",

  priceRow: "flex items-center justify-between gap-4 text-sm",

  priceLabel: "text-gray-600",

  priceValue: "font-medium text-gray-700",

  priceDivider: "my-3 border-t border-gray-200",

  totalRow:
    "mt-2 flex items-center justify-between gap-4 text-base font-semibold text-gray-900",

  optionsContainer: "mt-3",

  optionsList: "mt-1 flex flex-col gap-1",

  optionRow: "flex items-start justify-between gap-4 text-sm",

  optionName: "text-gray-500",

  optionValue: "text-right font-medium text-gray-700",

  customizations: "mt-3 flex flex-col gap-3",

  customizationGroup: "flex flex-col gap-1",

  customizationLabel: "text-sm font-medium text-gray-700",

  customizationList: "flex flex-wrap gap-2",

  customizationTag: "rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700",

  specialInstructions: "mt-3 text-sm italic text-gray-500",

  emptyCart: "flex flex-col items-center justify-center py-12 text-center",

  emptyCartTitle: "text-lg font-semibold text-gray-900",

  emptyCartDescription: "mt-2 text-sm text-gray-500",

  container: "mx-auto w-full max-w-7xl",

  cartLayout:
    "grid w-full grid-cols-1 gap-6 px-5 pb-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:px-0",

  itemsColumn: "min-w-0 w-full",

  summaryColumn: "min-w-0 w-full lg:sticky lg:top-6 lg:self-start",

  content:
    "grid grid-cols-1 gap-6 px-4 pb-24 pt-5 sm:px-6 lg:grid-cols-[minmax(0,48rem)_360px] lg:justify-center lg:px-8",

  itemPrice: "shrink-0 text-sm font-semibold text-[#C4632E] sm:text-base",

  itemDescription: "mt-1 text-sm leading-5 text-[#7B756C]",

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

  summaryPlaceholder:
    "rounded-2xl border border-[#E8E5DE] bg-white p-5 shadow-sm",

  drawerPaper: "w-full sm:w-[400px]",

  drawerContent: "flex h-full w-full flex-col",
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
