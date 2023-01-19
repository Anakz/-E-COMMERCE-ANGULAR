import { Basket } from "./basket";
import { Category } from "./category";
import { Image } from "./image";

export class Product {
    constructor(
        public id:number,
        public name:string,
        public description:string,
        public buying_price:number,
        public selling_price:number,
        public stock:number,
        public stock_available:number,
        public weight:number,
        public images:Array<Image>,
        public is_delete:boolean,
        public category?:Category,
        public order?:Array<Object>,
        public basket?:Array<Basket>,
        ){}
}
