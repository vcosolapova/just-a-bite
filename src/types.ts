export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartLineItem {
  lineItemId: string;
  item: Item;
  quantity: number;
}

export interface Order {
  orderId: string;
  timestamp: string;
  items: CartLineItem[];
  total: number;
}
