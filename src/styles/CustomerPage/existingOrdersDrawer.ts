
export const existingOrdersDrawerStyles = {
  container:
    "flex h-full w-screen flex-col bg-[#FCFBF9] text-[#1E1B16] sm:w-[420px]",

  header:
    "flex items-center justify-between border-b border-[#EAE6DF] px-5 py-5",

  heading: "text-xl font-semibold",

  tableInfo: "mt-1 text-sm text-[#6F6A63]",

  closeButton:
    "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F1EEE9]",

  content: "flex-1 overflow-y-auto p-5",

  // Loading and error states
  feedbackState:
    "flex h-full flex-col items-center justify-center text-center",

  loadingIcon: "mb-3 animate-spin text-[#E2793D]",

  errorIcon: "mb-3 text-[#A8A198]",

  feedbackText: "mt-2 max-w-[280px] text-sm text-[#6F6A63]",

  retryButton:
    "mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E2793D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#CB6832]",

  // Empty state
  emptyState:
    "flex h-full flex-col items-center justify-center text-center",

  emptyIcon: "mb-3 text-[#A8A198]",

  emptyTitle: "font-semibold",

  emptyDescription: "mt-1 text-sm text-[#6F6A63]",

  // Orders
  ordersList: "space-y-4",

  orderCard: "rounded-xl border border-[#EAE6DF] bg-white p-4",

  orderHeader: "flex items-center justify-between",

  orderNumber: "font-semibold",

  orderStatus:
    "rounded-full bg-[#F1EEE9] px-3 py-1 text-xs font-medium capitalize",

  itemsList: "mt-4 space-y-3",

  itemContainer: "space-y-2 border-b border-[#F1EEE9] pb-3",

  itemRow: "flex items-start justify-between gap-3",

  itemName: "text-sm font-medium text-[#1E1B16]",

  itemQuantity: "mt-1 text-xs text-[#6F6A63]",

  itemSubtotal: "shrink-0 text-sm font-medium text-[#1E1B16]",

  customisationGroup: "space-y-1 pl-2",

  customisationHeading: "text-xs font-medium text-[#6F6A63]",

  customisationItem: "text-xs text-[#6F6A63]",

  instructions: "space-y-1 rounded-lg bg-[#F8F5F0] p-3",

  // Order total
  orderFooter:
    "mt-3 flex items-center justify-between border-t border-[#EAE6DF] pt-3",

  totalLabel: "text-sm text-[#6F6A63]",

  totalAmount: "font-semibold",
};
