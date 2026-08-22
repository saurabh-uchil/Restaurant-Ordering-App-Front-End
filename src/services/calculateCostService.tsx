import type { CartItem } from "../store/cartStore";

export const calculateExtraCost = (item, selectedValues) => {
  let extraCost = 0;

  // required options
  item.options?.forEach((option) => {
    const selected = selectedValues.options?.[option.name];

    const choice = option.choices.find((choice) => choice.name === selected);

    extraCost += choice?.extraCost ?? 0;
  });

  // addons
  selectedValues.addons?.forEach((selectedAddon) => {
    const addon = item.addons?.find((addon) => addon.name === selectedAddon);

    extraCost += addon?.price ?? 0;
  });

  // dietary alternatives
  selectedValues.dietaryAlternatives?.forEach((selectedDA) => {
    const da = item.dietaryAlternatives?.find((da) => da.name === selectedDA);

    extraCost += da?.additionalPrice ?? 0;
  });

  return extraCost;
};

export const getItemTotal = (item: CartItem) => {
  const optionsTotal = Object.values(item.options).reduce(
    (acc, curr) => acc + curr.extraCost,
    0,
  );

  const addonsTotal = item.addons.reduce(
    (acc, curr) => acc + curr.extraCost,
    optionsTotal,
  );

  const dietaryAlternativesTotal = item.dietaryAlternatives.reduce(
    (acc, curr) => acc + curr.extraCost,
    addonsTotal,
  );

  return item.basePrice + dietaryAlternativesTotal;
};

export const getCartTotal = (cart: CartItem[]) => {
  const total = cart.reduce((acc, curr) => {
    const itemTotal = getItemTotal(curr) * curr.quantity;
    return acc + itemTotal;
  }, 0);

  return total;
};
