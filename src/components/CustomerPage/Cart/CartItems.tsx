import { Pencil, Trash2 } from "lucide-react";
import { useCart, type CartItem } from "../../../store/cartStore";
import { cartStyles as styles } from "../../../styles/cart";
import { getItemTotal } from "../../../services/calculateCostService";

type CartItemsProps = {
  handleEdit: (item: CartItem) => void;
  handleDelete: (cartItem: CartItem) => void;
};

const CartItems = ({ handleEdit, handleDelete }: CartItemsProps) => {
  const myCart = useCart((state) => state.myCart);

  if (myCart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <p className={styles.emptyCartTitle}>Your cart is empty</p>

        <p className={styles.emptyCartDescription}>
          Add something delicious from the menu to get started.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.itemsContainer}>
      {myCart.map((item) => {
        const itemTotal = getItemTotal(item);

        const selectedOptions = Object.entries(item.options ?? {}).filter(
          ([, value]) => value.name
        );

        return (
          <div key={item.cartItemId} className={styles.cartItem}>
            <div className={styles.itemMain}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.itemImage}
              />

              <div className={styles.itemInfo}>
                {/* Header */}
                <div className={styles.itemHeader}>
                  <h2 className={styles.itemName}>{item.name}</h2>

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => handleEdit(item)}
                      aria-label={`Edit ${item.name}`}
                      title="Edit item"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => handleDelete(item)}
                      aria-label={`Delete ${item.name}`}
                      title="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Base Price */}
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Base price</span>

                  <span className={styles.priceValue}>
                    ${item.basePrice.toFixed(2)}
                  </span>
                </div>

                {/* Options */}
                {selectedOptions.length > 0 && (
                  <div className={styles.optionsContainer}>
                    <p className={styles.customizationLabel}>Options</p>

                    <div className={styles.optionsList}>
                      {selectedOptions.map(([name, value]) => (
                        <div key={name} className={styles.optionRow}>
                          <span className={styles.optionName}>
                            {name}
                          </span>

                          <span className={styles.optionValue}>
                            {value.name}

                            {value.extraCost > 0 &&
                              ` (+$${value.extraCost.toFixed(2)})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customizations */}
                <div className={styles.customizations}>
                  {/* Add-ons */}
                  {item.addons?.length > 0 && (
                    <div className={styles.customizationGroup}>
                      <span className={styles.customizationLabel}>
                        Add-ons
                      </span>

                      <div className={styles.customizationList}>
                        {item.addons.map((addon) => (
                          <span
                            key={addon.name}
                            className={styles.customizationTag}
                          >
                            {addon.name}

                            {addon.extraCost > 0 &&
                              ` (+$${addon.extraCost.toFixed(2)})`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dietary Alternatives */}
                  {item.dietaryAlternatives?.length > 0 && (
                    <div className={styles.customizationGroup}>
                      <span className={styles.customizationLabel}>
                        Dietary
                      </span>

                      <div className={styles.customizationList}>
                        {item.dietaryAlternatives.map((alternative) => (
                          <span
                            key={alternative.name}
                            className={styles.customizationTag}
                          >
                            {alternative.name}

                            {alternative.extraCost > 0 &&
                              ` (+$${alternative.extraCost.toFixed(2)})`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Removed Ingredients */}
                  {item.removableIngredients?.length > 0 && (
                    <div className={styles.customizationGroup}>
                      <span className={styles.customizationLabel}>
                        Removed
                      </span>

                      <div className={styles.customizationList}>
                        {item.removableIngredients.map((ingredient) => (
                          <span
                            key={ingredient}
                            className={styles.customizationTag}
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                {item.specialInstructions && (
                  <p className={styles.specialInstructions}>
                    Note: {item.specialInstructions}
                  </p>
                )}

                {/* Price Breakdown */}
                <div className={styles.priceBreakdown}>
                  <div className={styles.priceDivider} />

                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>
                      Price per item
                    </span>

                    <span className={styles.priceValue}>
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Quantity</span>

                    <span className={styles.priceValue}>
                      {item.quantity}
                    </span>
                  </div>

                  <div className={styles.totalRow}>
                    <span>Total</span>

                    <span>
                      ${(itemTotal * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;