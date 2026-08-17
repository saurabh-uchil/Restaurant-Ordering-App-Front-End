import { Minus, Plus, X } from "lucide-react";
import { itemCustomizerStyles as styles } from "../../styles/CustomerPage/itemCustomizer";
import { useState } from "react";

type ItemCustomizerProps = {
  item: any;
  handleClose: () => void;
};

const ItemCustomizer = ({ item, handleClose }: ItemCustomizerProps) => {
  const [quantity, setQuantity] = useState(1);

  const total = item.price * quantity;

  const options = item.options ?? [];

  const imgageUrl = item.imageUrl;

  const optionsDiv =
    options.length > 0 ? (
      options.map((option) => (
        <div key={option.name} className={styles.optionGroup}>
          <p className={styles.sectionTitle}>{option.name}</p>

          <div className={styles.choiceList}>
            {option.choices.map((choice) => (
              <label key={choice.name} className={styles.choiceRow}>
                <div className={styles.choiceInfo}>
                  <input
                    type="checkbox"
                    value={choice.name}
                    className={styles.checkbox}
                  />

                  <span className={styles.choiceName}>{choice.name}</span>
                </div>

                {choice.extraCost > 0 && (
                  <span className={styles.extraCost}>+${choice.extraCost}</span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p className={styles.emptyText}>No additional options available.</p>
    );

  const addons = item.addons ?? [];

  const addonsDiv = addons.map((addon) => (
    <label key={addon.name} className={styles.choiceRow}>
      <div className={styles.choiceInfo}>
        <input value={addon.name} type="checkbox" className={styles.checkbox} />

        <span className={styles.choiceName}>{addon.name}</span>
      </div>

      {addon.cost > 0 && (
        <span className={styles.extraCost}>+${addon.cost}</span>
      )}
    </label>
  ));

  const dietaryAlternatives = item.dietaryAlternatives ?? [];

  const dietaryAlternativesDiv = dietaryAlternatives.map((da) => (
    <label key={da.name} className={styles.choiceRow}>
      <div className={styles.choiceInfo}>
        <input value={da.name} type="checkbox" className={styles.checkbox} />

        <span className={styles.choiceName}>{da.name}</span>
      </div>

      {da.additionalPrice > 0 && (
        <span className={styles.extraCost}>+${da.additionalPrice}</span>
      )}
    </label>
  ));

  const removableIngredients = item.removableIngredients ?? [];

  const removableIngredientsDiv = removableIngredients.map((ingredient) => (
    <label key={ingredient} className={styles.choiceRow}>
      <div className={styles.choiceInfo}>
        <input type="checkbox" value={ingredient} className={styles.checkbox} />

        <span className={styles.choiceName}>{ingredient}</span>
      </div>
    </label>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.mobileHandle} />

      <header className={styles.header}>
        <div>
          <p className={styles.label}>Customize your order</p>
          <h2 className={styles.title}>{item.name}</h2>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close item customizer"
        >
          <X size={19} />
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <img src={imgageUrl} alt={item.name} className={styles.itemImage} />

          <p className={styles.itemDescription}>{item.description}</p>
        </div>

        <form className={styles.form}>
          <section className={styles.section}>{optionsDiv}</section>

          {addons.length > 0 && (
            <section className={styles.section}>
              <p className={styles.sectionTitle}>Add-ons</p>

              <div className={styles.choiceList}>{addonsDiv}</div>
            </section>
          )}

          {dietaryAlternatives.length > 0 && (
            <section className={styles.section}>
              <p className={styles.sectionTitle}>Dietary alternatives</p>

              <div className={styles.choiceList}>{dietaryAlternativesDiv}</div>
            </section>
          )}

          {removableIngredients.length > 0 && (
            <section className={styles.section}>
              <p className={styles.sectionTitle}>Remove ingredients</p>

              <div className={styles.choiceList}>{removableIngredientsDiv}</div>
            </section>
          )}

          <section className={styles.section}>
            <label className={styles.sectionTitle}>Special Instructions</label>

            <textarea
              placeholder="Add a note for the chef"
              className={styles.textarea}
            />
          </section>

          <div className={styles.quantityContainer}>
            <p className={styles.quantityLabel}>Quantity</p>

            <div className={styles.quantityControls}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={() => {
                  setQuantity((quantity) => Math.max(1, quantity - 1));
                }}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className={styles.quantityValue}>{quantity}</span>

              <button
                type="button"
                className={styles.quantityButton}
                onClick={() => {
                  setQuantity((quantity) => quantity + 1);
                }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className={styles.cartFooter}>
            <button className={styles.addToCartButton}>
              <span>Add to Cart</span>
              <span>${total.toFixed(2)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemCustomizer;
