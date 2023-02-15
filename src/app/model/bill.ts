import { Order } from "./order";

export class Bill {
    constructor(
        public id:number,
        public total_price:number,
        public is_deleted:boolean,
        public order:Order
    ){}
}