import { Product } from "./product";
import { User } from "./user";

export class Basket {
    constructor(
        public id:number,
        public date:Date,
        public quantity:number,
        public total_price:number,
        public user:User,
        public product:Array<Product>,
        public is_deleted:boolean
    ){}

}