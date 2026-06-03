export interface Product {
// structure of a product item for local storage
  id: number;
  name: string;
  category: string;
  price: number;
  stockCount: number;
  cartid: number | undefined; // Unique identifier for cart items, optional for inventory items
}
