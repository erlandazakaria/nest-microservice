export interface order {
  _id: string,
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  total: number;
  createdDate: Date;
  updatedDate: Date;
}

export interface CreateOrderReq {
  userId: string;
  productId: string;
  quantity: number;
}
