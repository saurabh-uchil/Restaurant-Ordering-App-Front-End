const getShortcode = (name: string) => {
    const words = name.split(" ");
    const shortcode = words.map(word => word.charAt(0).toUpperCase()).join("");
    return shortcode;
}

export const formattedData = (data, existingDietaryAlternatives, existingAddons, existingOptionGroups) => {

      const updatedPrice = data.price ? parseFloat(data.price) : 0;
      const updatedAddons = data.addons ? data.addons.map((addon: any) => ({name: addon.name, price: parseFloat(addon.price)})) : [];
      const updatedDietaryAlternatives = data.dietaryAlternatives ? data.dietaryAlternatives.map((alt: any) => ({name: alt.name, shortCode: getShortcode(alt.name), additionalPrice: parseFloat(alt.additionalPrice)})) : [];
      const updatedOptions = data.options ? data.options.map((option: any) => ({name: option.name, choices: option.choices ? option.choices.map((choice: any) => ({name: choice.name, extraCost: parseFloat(choice.extraCost)})) : []})) : []; 
      
      const updatedData = {...data, options: updatedOptions, addons: updatedAddons, dietaryAlternatives: updatedDietaryAlternatives, price: updatedPrice};

      const updatedDietaryAlternativesWithIds = existingDietaryAlternatives && existingDietaryAlternatives.length > 0 ? addExistingIdsToData(updatedDietaryAlternatives, existingDietaryAlternatives) : updatedDietaryAlternatives;
      const updatedAddonsWithIds = existingAddons && existingAddons.length > 0 ? addExistingIdsToData(updatedAddons, existingAddons) : updatedAddons;
      const updatedOptionsWithIds = existingOptionGroups && existingOptionGroups.length > 0 ? addExistingIdsToData(updatedOptions, existingOptionGroups) : updatedOptions;

      const cleanData = {...updatedData, dietaryAlternatives: updatedDietaryAlternativesWithIds, addons: updatedAddonsWithIds, options: updatedOptionsWithIds};  

      return cleanData;
}

export const addExistingIdsToData = (data, existingItems) => {
    console.log("Existing Items:", existingItems);
 const arrayOfExistingIds = existingItems.map((item: any) => ({id: item._id}));
 const updatedData = [...data, ...arrayOfExistingIds];
 return updatedData;
}