export const buildSelectedOptions = (
  item: any,
  selectedOptions: Record<string, string>
) => {
  const result: Record<string, SelectedItem> = {};

  const entries = Object.entries(selectedOptions);

  entries.forEach(([optionName, selectedName]) => {
    const option = item.options.find(
      (option) => option.name === optionName
    );

    const choice = option?.choices.find(
      (choice) => choice.name === selectedName
    );

    result[optionName] = {
      name: selectedName,
      extraCost: choice?.extraCost ?? 0,
    };
  });

  return result;
};

export const buildSelectedAddons = (
  item: any,
  selectedAddons: string[]
) => {
  const result: SelectedItem[] = [];

  selectedAddons.forEach((addonName) => {
    const addon = item.addons?.find(
      (addon) => addon.name === addonName
    );

    result.push({
      name: addonName,
      extraCost: addon?.price ?? 0,
    });
  });

  return result;
};

export const buildSelectedDietaryAlternatives = (
  item: any,
  selectedAlternatives: string[]
) => {
  const result: SelectedItem[] = [];

  selectedAlternatives.forEach((alternativeName) => {
    const alternative = item.dietaryAlternatives?.find(
      (alternative) => alternative.name === alternativeName
    );

    result.push({
      name: alternativeName,
      extraCost: alternative?.additionalPrice ?? 0,
    });
  });

  return result;
};