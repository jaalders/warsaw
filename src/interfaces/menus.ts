export interface IMenuResponse {
  menus: IMenuSettings[];
}

export interface IMenuSettings {
  id: number;
  name: string;
  description?: string;
}

export interface IMenuItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price?: number;
  calories?: number;
  itemAdditions?: IMenuItemAdditions[];
  dietaryOptions?: IMenuDietaryOptions[];
}

export interface IMenuItemAdditions {
  id: number;
  name: string;
  price: number | undefined;
  added: boolean;
}

export interface IMenuDietaryOptions {
  [key: string]: number | string;
}
