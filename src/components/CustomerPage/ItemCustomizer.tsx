import { Minus, Plus, X } from "lucide-react";
import { itemCustomizerStyles as styles } from "../../styles/CustomerPage/itemCustomizer";
import CustomizeOptions from "./CustomizeOptions";
import RemovableIngredient from "./RemovableIngredient";
import { FormProvider, useForm } from "react-hook-form";
import { calculateExtraCost } from "../../services/calculateCostService";
import { useCart, type CartItem } from "../../store/cartStore";
import {
  buildSelectedAddons,
  buildSelectedDietaryAlternatives,
  buildSelectedOptions,
} from "../../services/transformService";

type ItemCustomizerProps = {
  item: any;
  handleClose: () => void;
  handleToast?: (item: string) => void;
  cartItem?: CartItem;
};

const ItemCustomizer = ({
  item,
  handleClose,
  handleToast,
  cartItem,
}: ItemCustomizerProps) => {
  const methods = useForm({
    defaultValues: {
      quantity: cartItem?.quantity ?? 1,
      specialInstructions: cartItem?.specialInstructions ?? "",
      addons: cartItem?.addons?.map((addon) => addon.name) ?? [],
      dietaryAlternatives: cartItem?.dietaryAlternatives?.map((alternative) => alternative.name) ?? [],
      removableIngredients: cartItem?.removableIngredients ?? [],
      options: Object.fromEntries(Object.entries(cartItem?.options ?? {}).map(([name, choice]) => [name, choice.name]))
    },
  });

  const { handleSubmit, register, watch, setValue } = methods;

  const quantity = watch("quantity");

  const selectedValues = watch();

  const extraCost = calculateExtraCost(item, selectedValues);

  const total = (item.price + extraCost) * quantity;

  const imgageUrl = item.imageUrl;

  const options = item.options ?? [];

  const optionsDiv = options.map((option) => (
    <CustomizeOptions
      key={option.name}
      option={option.choices.map((choice) => ({
        name: choice.name,
        cost: choice.extraCost,
      }))}
      title={option.name}
      type="radio"
      fieldName={`options.${option.name}`}
    />
  ));

  const addons = item.addons ?? [];

  const addonsDiv = (
    <CustomizeOptions
      option={addons.map((addon) => ({ name: addon.name, cost: addon.price }))}
      title="Add-ons (Optional)"
      type="checkbox"
      fieldName="addons"
    />
  );

  const dietaryAlternatives = item.dietaryAlternatives ?? [];

  const dietaryAlternativesDiv = (
    <CustomizeOptions
      option={dietaryAlternatives.map((da) => ({
        name: da.name,
        cost: da.additionalPrice,
      }))}
      title="Dietary alternatives (Optional)"
      type="checkbox"
      fieldName="dietaryAlternatives"
    />
  );

  const removableIngredients = item.removableIngredients ?? [];

  const removableIngredientsDiv = (
    <RemovableIngredient
      ingredients={removableIngredients}
      fieldName="removableIngredients"
    />
  );

  const addToCart = useCart((state) => state.addToCart);
  const editCartItem = useCart((state) => state.editCartItem);

  const handleAddToCart = (data) => {
    const selectedOptions = buildSelectedOptions(item, data.options);
    const selectedAddons = buildSelectedAddons(item, data.addons);
    const selectedDietaryAlternatives = buildSelectedDietaryAlternatives(
      item,
      data.dietaryAlternatives,
    );
    const cartItemId = crypto.randomUUID();

    const { _id: itemId, name, price, imageUrl } = item;
    const cartItem = {
      ...data,
      itemId,
      name,
      options: selectedOptions,
      addons: selectedAddons,
      dietaryAlternatives: selectedDietaryAlternatives,
      basePrice: price,
      imageUrl,
      cartItemId,
    };
    addToCart(cartItem);
    handleClose();
    handleToast?.(name);
  };

  const handleEditCartItem = (data) => {

    console.log("EDIT FORM DATA:", data);

    const selectedOptions = buildSelectedOptions(item, data.options);
    const selectedAddons = buildSelectedAddons(item, data.addons);
    const selectedDietaryAlternatives = buildSelectedDietaryAlternatives(
      item,
      data.dietaryAlternatives,
    );

    console.log("SELECTED OPTIONS:", selectedOptions);
    console.log("SELECTED ADDONS:", selectedAddons);
    console.log("SELECTED DIETARY:", selectedDietaryAlternatives);

    editCartItem({
      ...cartItem,
      ...data,
      options: selectedOptions,
      addons: selectedAddons,
      dietaryAlternatives: selectedDietaryAlternatives,
    });
    handleClose();
    handleToast?.(cartItem?.name ?? item.name);
  };

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

        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(
              cartItem ? handleEditCartItem : handleAddToCart,
            )}
          >
            {options.length > 0 && (
              <>
                <p className={styles.sectionTitle}>
                  Choose the options you'd like. ( Required )
                </p>
                {optionsDiv}
              </>
            )}

            {addons.length > 0 && addonsDiv}

            {dietaryAlternatives.length > 0 && dietaryAlternativesDiv}

            {removableIngredients.length > 0 && removableIngredientsDiv}

            <section className={styles.section}>
              <label className={styles.sectionTitle}>
                Special Instructions
              </label>

              <textarea
                placeholder="Add a note for the chef"
                className={styles.textarea}
                {...register("specialInstructions")}
              />
            </section>

            <div className={styles.quantityContainer}>
              <p className={styles.quantityLabel}>Quantity</p>

              <div className={styles.quantityControls}>
                <button
                  type="button"
                  className={styles.quantityButton}
                  onClick={() => {
                    setValue("quantity", Math.max(1, quantity - 1));
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
                    setValue("quantity", quantity + 1);
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className={styles.cartFooter}>
              <button type="submit" className={styles.addToCartButton}>
                <span>{cartItem ? "Save" : "Add to Cart"}</span>
                <span>${total.toFixed(2)}</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ItemCustomizer;
