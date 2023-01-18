import { Itypes } from "../../interfaces/types";

export interface IProduct {
  id: number;
  name: string;
  stock: number;
  type: Itypes;
}

export interface IProductRequest {
  name: string;
  stock: number;
  type: () => string;
}
