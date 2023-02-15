import { Order } from "./order";

export class Delivery {
    constructor(
        public id:number,
        public start_date:Date,
        public arrived_date:Date,
        public is_deleted:boolean,
        public order:Order
    ){}
}