import { orderItemsStyles as styles } from "../../styles/CustomerPage/orderItems";

type Customization = {
  name: string;
  extraCost: number;
};

type OrderItem = {
  itemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  addons?: Customization[];
  dietaryAlternatives?: Customization[];
  removableIngredients?: string[];
  options?: Record<string, Customization>;
  specialInstructions?: string;
};

type OrderItemsProps = {
  items: OrderItem[];
};

const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div
          key={`${item.itemId}-${index}`}
          className={styles.item}
        >
          {/* Item */}
          <div className={styles.itemHeader}>
            <div className={styles.itemNameContainer}>
              <span className={styles.quantity}>
                {item.quantity} ×
              </span>

              <span className={styles.itemName}>
                {item.name}
              </span>
            </div>
          </div>

          {/* Options */}
          {item.options &&
            Object.entries(item.options).length > 0 && (
              <div className={styles.customizations}>
                {Object.entries(item.options).map(
                  ([optionName, option]) => (
                    <p
                      key={optionName}
                      className={styles.option}
                    >
                      <span>{optionName}:</span>{" "}
                      {option.name}

                      {option.extraCost > 0 && (
                        <span className={styles.optionCost}>
                          {" "}
                          (+$
                          {option.extraCost.toFixed(2)})
                        </span>
                      )}
                    </p>
                  )
                )}
              </div>
            )}

          {/* Add-ons */}
          {item.addons && item.addons.length > 0 && (
            <div className={styles.customizations}>
              {item.addons.map((addon, addonIndex) => (
                <p
                  key={`${addon.name}-${addonIndex}`}
                  className={styles.addon}
                >
                  + {addon.name}

                  {addon.extraCost > 0 && (
                    <span className={styles.optionCost}>
                      {" "}
                      (+${addon.extraCost.toFixed(2)})
                    </span>
                  )}
                </p>
              ))}
            </div>
          )}

          {/* Dietary alternatives */}
          {item.dietaryAlternatives &&
            item.dietaryAlternatives.length > 0 && (
              <div className={styles.customizations}>
                {item.dietaryAlternatives.map(
                  (alternative, alternativeIndex) => (
                    <p
                      key={`${alternative.name}-${alternativeIndex}`}
                      className={styles.customization}
                    >
                      {alternative.name}

                      {alternative.extraCost > 0 && (
                        <span className={styles.optionCost}>
                          {" "}
                          (+$
                          {alternative.extraCost.toFixed(2)})
                        </span>
                      )}
                    </p>
                  )
                )}
              </div>
            )}

          {/* Removed ingredients */}
          {item.removableIngredients &&
            item.removableIngredients.length > 0 && (
              <div className={styles.customizations}>
                {item.removableIngredients.map(
                  (ingredient, ingredientIndex) => (
                    <p
                      key={`${ingredient}-${ingredientIndex}`}
                      className={styles.removedIngredient}
                    >
                      No {ingredient}
                    </p>
                  )
                )}
              </div>
            )}

          {/* Special instructions */}
          {item.specialInstructions?.trim() && (
            <div className={styles.note}>
              <span className={styles.noteLabel}>
                Note:
              </span>{" "}
              {item.specialInstructions}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderItems;