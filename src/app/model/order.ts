import { Bill } from "./bill";
import { Delivery } from "./delivery";
import { Product } from "./product";
import { User } from "./user";

export class Order {
    constructor(
        public id:number,
        public ordered:Date,
        public shipped:Date,
        public status:string,
        public quantity:number,
        public delivery_price:number,
        public total:number,
        public is_deleted:boolean,
        public product:Array<Product>,
        public user:User,
        public bill?:Bill,
        public delivery?:Delivery,
    ){}
}