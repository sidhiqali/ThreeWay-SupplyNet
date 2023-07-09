export interface User {
  _id?: string;
  username: string;
  email: string;
  isTransporter: boolean;
  address: string;
  password?: string;
}


export interface IOrder {
  id?:string;
  orderId?:string;
  from:string;
  to:string;
  quantity:number;
  manufactureId?:string;
  transporterId?:string;
  pickUpAddress?:string;
  createdAt?:string;
  updatedAt?:string;
}

export interface IMessage {
  conversationId: string;
  userId: string;
  desc: string;
}