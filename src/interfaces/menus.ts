export interface IMenuResponse {
  menus: IMenuSettings[];
}

export interface IMenuSettings {
  id: number;
  name: string;
  description?: string;
}
