import { Product } from "./product";

export class Image {
    constructor(
        public id:number,
        public img:string,
        public is_deleted:boolean,
        public product?:Product
    ){}
}
