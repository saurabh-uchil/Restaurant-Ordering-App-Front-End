import { Minus, Plus } from "lucide-react";
import { useCart } from "../../../store/cartStore";
import { cartStyles as styles } from "../../../styles/cart";

const CartItems = () => {
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
      {myCart.map((item) => (
        <div key={item.itemId} className={styles.cartItem}>
          <div className={styles.itemMain}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <h2 className={styles.itemName}>{item.name}</h2>

                <p className={styles.itemPrice}>
                  ${(item.basePrice * item.quantity).toFixed(2)}
                </p>
              </div>

              {item.options && Object.entries(item.options).length > 0 && (
                <div className={styles.optionsContainer}>
                  <p className={styles.customizationLabel}>Options</p>

                  <div className={styles.optionsList}>
                    {Object.entries(item.options ?? {}).map(([name, value]) => (
                      <div key={name} className={styles.optionRow}>
                        <span className={styles.optionName}>{name}</span>

                        <span className={styles.optionValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.customizations}>
                {item.addons?.length > 0 && (
                  <div className={styles.customizationGroup}>
                    <span className={styles.customizationLabel}>Add-ons</span>

                    <div className={styles.customizationList}>
                      {item.addons.map((addon, i) => (
                        <span key={i} className={styles.customizationTag}>
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.dietaryAlternatives?.length > 0 && (
                  <div className={styles.customizationGroup}>
                    <span className={styles.customizationLabel}>Dietary</span>

                    <div className={styles.customizationList}>
                      {item.dietaryAlternatives.map((da, i) => (
                        <span key={i} className={styles.customizationTag}>
                          {da}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.removableIngredients?.length > 0 && (
                  <div className={styles.customizationGroup}>
                    <span className={styles.customizationLabel}>Removed</span>

                    <div className={styles.customizationList}>
                      {item.removableIngredients.map((ra, i) => (
                        <span key={i} className={styles.customizationTag}>
                          {ra}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {item.specialInstructions && (
                <p className={styles.specialInstructions}>
                  Note: {item.specialInstructions}
                </p>
              )}
            </div>
          </div>

          <div className={styles.itemFooter}>
            <div>
              <p className={styles.quantityLabel}>Quantity</p>

              <div className={styles.quantityControls}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus size={14} />
                </button>

                <span className={styles.quantityValue}>{item.quantity}</span>

                <button
                  type="button"
                  className={styles.quantityButton}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button type="button" className={styles.editButton}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
