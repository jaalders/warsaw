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
  menuItemTypeId: number;
  image?: string;
  title: string;
  description?: string;
  price: number | undefined;
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
  id: number;
  name: string;
}
