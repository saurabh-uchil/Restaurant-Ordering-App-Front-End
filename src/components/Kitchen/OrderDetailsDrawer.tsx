import { Drawer } from "@mui/material";
import { Check, Clock3, X } from "lucide-react";

import { styles as OrderDetailsDrawerStyles } from "../../styles/Kitchen/OrderDetailsDrawer";
import type { KitchenOrder } from "../../types/KitchenOrder";

type OrderDetailsDrawerProps = {
  order: KitchenOrder | null;
  onClose: () => void;
};

const OrderDetailsDrawer = ({
  order,
  onClose,
}: OrderDetailsDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={!!order}
      onClose={onClose}
      slotProps={{
        paper: {
          className: OrderDetailsDrawerStyles.drawer,
        },
      }}
    >
      {order && (
        <div className={OrderDetailsDrawerStyles.drawerContent}>
          <div className={OrderDetailsDrawerStyles.drawerHeader}>
            <div>
              <p className={OrderDetailsDrawerStyles.drawerEyebrow}>
                ORDER
              </p>

              <h2 className={OrderDetailsDrawerStyles.drawerTitle}>
                #{order.orderNumber}
              </h2>

              <p className={OrderDetailsDrawerStyles.drawerTable}>
                Table {order.table}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={OrderDetailsDrawerStyles.closeButton}
              aria-label="Close order details"
            >
              <X size={20} />
            </button>
          </div>

          <div className={OrderDetailsDrawerStyles.drawerMeta}>
            <div className={OrderDetailsDrawerStyles.statusBadge}>
              <Check size={14} />
              Completed
            </div>

            <div className={OrderDetailsDrawerStyles.date}>
              <Clock3 size={15} />

              {new Date(order.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className={OrderDetailsDrawerStyles.divider} />

          <section className={OrderDetailsDrawerStyles.section}>
            <h3 className={OrderDetailsDrawerStyles.sectionTitle}>
              Order Items
            </h3>

            <div className={OrderDetailsDrawerStyles.orderItems}>
              {order.items.map((item, index) => (
                <div
                  key={`${item.itemId}-${index}`}
                  className={OrderDetailsDrawerStyles.orderItem}
                >
                  <div className={OrderDetailsDrawerStyles.itemMain}>
                    <div className={OrderDetailsDrawerStyles.itemQuantity}>
                      {item.quantity} ×
                    </div>

                    <div className={OrderDetailsDrawerStyles.itemInfo}>
                      <p className={OrderDetailsDrawerStyles.itemName}>
                        {item.name}
                      </p>

                      {item.specialInstructions && (
                        <p className={OrderDetailsDrawerStyles.itemInstruction}>
                          {item.specialInstructions}
                        </p>
                      )}

                      {item.addons.length > 0 && (
                        <div className={OrderDetailsDrawerStyles.modifiers}>
                          {item.addons.map((addon, addonIndex) => (
                            <p key={`${addon.name}-${addonIndex}`}>
                              + {addon.name}
                            </p>
                          ))}
                        </div>
                      )}

                      {item.dietaryAlternatives.length > 0 && (
                        <div className={OrderDetailsDrawerStyles.modifiers}>
                          {item.dietaryAlternatives.map(
                            (alternative, alternativeIndex) => (
                              <p key={`${alternative.name}-${alternativeIndex}`}>
                                + {alternative.name}
                              </p>
                            )
                          )}
                        </div>
                      )}

                      {item.options && Object.entries(item.options).map(
                        ([optionName, option], optionIndex) =>
                          option.name && (
                            <p
                              key={`${optionName}-${optionIndex}`}
                              className={OrderDetailsDrawerStyles.modifier}
                            >
                              {optionName}: {option.name}
                            </p>
                          )
                      )}

                      {item.removableIngredients.length > 0 && (
                        <div className={OrderDetailsDrawerStyles.removedItems}>
                          {item.removableIngredients.map(
                            (ingredient, ingredientIndex) => (
                              <p
                                key={`${ingredient}-${ingredientIndex}`}
                              >
                                − No {ingredient}
                              </p>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className={OrderDetailsDrawerStyles.itemPrice}>
                    ${item.basePrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className={OrderDetailsDrawerStyles.divider} />

          <section className={OrderDetailsDrawerStyles.summary}>
            <div className={OrderDetailsDrawerStyles.summaryRow}>
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>

            <div className={OrderDetailsDrawerStyles.totalRow}>
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </section>

          <button
            type="button"
            onClick={onClose}
            className={OrderDetailsDrawerStyles.closeDrawerButton}
          >
            Close
          </button>
        </div>
      )}
    </Drawer>
  );
};

export default OrderDetailsDrawer;