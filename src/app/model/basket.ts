import { Product } from "./product";

export class Basket {
    constructor(
        public id:number,
        public date:Date,
        public quantity:number,
        public total_price:number,
        public id_user:number,
        public product:Product[],
        public is_deleted:boolean
    ){}
}