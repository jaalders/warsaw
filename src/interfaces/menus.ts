export interface IMenuResponse {
  menus: IMenuSettings[];
}

export interface IMenuSettings {
  id?: number;
  name: string;
  description?: string;
}

export interface IMenuItem {
  id?: number;
  image: string;
  title: string;
  description: string;
  price?: number;
  calories?: number;
  itemAdditions: IMenuItemAdditions[];
  dietaryOptions?: IMenuDietaryOptions[];
}

export interface IMenuItemAdditions {
  name: string;
  price?: number;
  added: boolean;
}

export interface IMenuDietaryOptions {
  id?: number;
  name: string;
}
