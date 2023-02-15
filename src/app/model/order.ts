import { Bill } from "./bill";
import { Delivery } from "./delivery";
import { Product } from "./product";
import { User } from "./user";

export class Order {
    constructor(
        public id:number,
        public ordered:string,
        private shipped:string,
        private status:string,
        private quantity:number,
        private delivery_price:number,
        private total:number,
        private is_deleted:boolean,
        private product:Array<Product>,
        private user:User,
        private bill?:Bill,
        private delivery?:Delivery,
    ){}
}