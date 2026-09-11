export type OrderSummaryProps = {
  subtotal?: string;
  serviceFee?: string;
  tax?: string;
  total?: string;
  onContinueShopping: () => void;
  onConfirmOrder: () => void;
  isPending?: boolean;
  isError?: boolean;
  error?: Error | null;
};