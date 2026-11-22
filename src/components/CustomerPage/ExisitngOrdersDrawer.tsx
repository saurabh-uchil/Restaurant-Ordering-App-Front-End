
import { Drawer } from "@mui/material";
import { X, ReceiptText, LoaderCircle, RefreshCw } from "lucide-react";
import { existingOrdersDrawerStyles as styles } from "../../styles/CustomerPage/existingOrdersDrawer";

type SelectedItem = {
  name: string;
  extraCost: number;
};

type CartItem = {
  itemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  specialInstructions?: string;
  addons: SelectedItem[];
  dietaryAlternatives: SelectedItem[];
  removableIngredients: string[];
  options: Record<string, SelectedItem>;
};

type ExistingOrder = {
  _id: string;
  orderNumber: number;
  status: string;
  items: CartItem[];
  total: number;
};

type ExistingOrdersDrawerProps = {
  open: boolean;
  onClose: () => void;
  orders: ExistingOrder[];
  table: string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

const ExistingOrdersDrawer = ({
  open,
  onClose,
  orders,
  table,
  isLoading,
  isError,
  onRetry,
}: ExistingOrdersDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.heading}>Your orders</h2>
            <p className={styles.tableInfo}>Table {table}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close orders drawer"
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.feedbackState}>
              <LoaderCircle
                size={32}
                className={styles.loadingIcon}
              />
              <p className={styles.feedbackText}>
                Loading your orders...
              </p>
            </div>
          ) : isError ? (
            <div className={styles.feedbackState}>
              <ReceiptText
                size={36}
                className={styles.errorIcon}
              />

              <h3 className={styles.emptyTitle}>
                Unable to load orders
              </h3>

              <p className={styles.feedbackText}>
                Something went wrong while fetching your orders.
                Please try again.
              </p>

              <button
                type="button"
                onClick={onRetry}
                className={styles.retryButton}
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className={styles.emptyState}>
              <ReceiptText size={36} className={styles.emptyIcon} />

              <h3 className={styles.emptyTitle}>No orders yet</h3>

              <p className={styles.emptyDescription}>
                Your orders will appear here once you've placed one.
              </p>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  {/* Order Header */}
                  <div className={styles.orderHeader}>
                    <h3 className={styles.orderNumber}>
                      Order #{order.orderNumber}
                    </h3>

                    <span className={styles.orderStatus}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className={styles.itemsList}>
                    {order.items.map((item, index) => {
                      const selectedOptions = Object.entries(
                        item.options ?? {},
                      );

                      return (
                        <div
                          key={`${item.itemId}-${index}`}
                          className={styles.itemContainer}
                        >
                          <div className={styles.itemRow}>
                            <div>
                              <p className={styles.itemName}>
                                {item.name}
                              </p>

                              <p className={styles.itemQuantity}>
                                Qty: {item.quantity} × $
                                {item.basePrice.toFixed(2)}
                              </p>
                            </div>

                            <span className={styles.itemSubtotal}>
                              ${(item.quantity * item.basePrice).toFixed(2)}
                            </span>
                          </div>

                          {/* Add-ons */}
                          {item.addons?.length > 0 && (
                            <div className={styles.customisationGroup}>
                              <p className={styles.customisationHeading}>
                                Add-ons
                              </p>

                              {item.addons.map((addon, addonIndex) => (
                                <p
                                  key={`${addon.name}-${addonIndex}`}
                                  className={styles.customisationItem}
                                >
                                  + {addon.name}
                                  {addon.extraCost > 0 &&
                                    ` (+$${addon.extraCost.toFixed(2)})`}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Dietary Alternatives */}
                          {item.dietaryAlternatives?.length > 0 && (
                            <div className={styles.customisationGroup}>
                              <p className={styles.customisationHeading}>
                                Dietary alternatives
                              </p>

                              {item.dietaryAlternatives.map(
                                (alternative, alternativeIndex) => (
                                  <p
                                    key={`${alternative.name}-${alternativeIndex}`}
                                    className={styles.customisationItem}
                                  >
                                    {alternative.name}
                                    {alternative.extraCost > 0 &&
                                      ` (+$${alternative.extraCost.toFixed(2)})`}
                                  </p>
                                ),
                              )}
                            </div>
                          )}

                          {/* Options */}
                          {selectedOptions.length > 0 && (
                            <div className={styles.customisationGroup}>
                              <p className={styles.customisationHeading}>
                                Options
                              </p>

                              {selectedOptions.map(([optionName, option]) => (
                                <p
                                  key={optionName}
                                  className={styles.customisationItem}
                                >
                                  {optionName}: {option.name}
                                  {option.extraCost > 0 &&
                                    ` (+$${option.extraCost.toFixed(2)})`}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Removed Ingredients */}
                          {item.removableIngredients?.length > 0 && (
                            <div className={styles.customisationGroup}>
                              <p className={styles.customisationHeading}>
                                Removed ingredients
                              </p>

                              {item.removableIngredients.map(
                                (ingredient, ingredientIndex) => (
                                  <p
                                    key={`${ingredient}-${ingredientIndex}`}
                                    className={styles.customisationItem}
                                  >
                                    − {ingredient}
                                  </p>
                                ),
                              )}
                            </div>
                          )}

                          {/* Special Instructions */}
                          {item.specialInstructions && (
                            <div className={styles.instructions}>
                              <p className={styles.customisationHeading}>
                                Special instructions
                              </p>

                              <p className={styles.customisationItem}>
                                {item.specialInstructions}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Total */}
                  <div className={styles.orderFooter}>
                    <span className={styles.totalLabel}>
                      Order total
                    </span>

                    <span className={styles.totalAmount}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ExistingOrdersDrawer;
