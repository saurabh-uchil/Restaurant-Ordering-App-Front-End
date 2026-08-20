export type MenuResponse = MenuItem[];

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  menuType: MenuType[];
  imageUrl: string;
  course: string;
  options: MenuOption[];
  addons: Addon[];
  removableIngredients: string[];
  dietaryAlternatives: DietaryAlternative[];
  availability: Availability[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  restaurant_Id: string;
};

export type MenuType = "breakfast" | "lunch" | "dinner";

export type MenuOption = {
  _id: string;
  name: string;
  choices: OptionChoice[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OptionChoice = {
  _id: string;
  name: string;
  extraCost: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Addon = {
  _id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DietaryAlternative = {
  _id: string;
  name: string;
  shortCode: string;
  additionalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Availability = unknown;
