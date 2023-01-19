import { Product } from "./product";

export class Category {
    constructor(
        public id:number,
        public name:string,
        public is_deleted:boolean,
        public product?:Array<Product>
    ){}
}


/* 
    private Long id;
    private String name;
    private Collection<Product> products;
    private boolean is_deleted;
*/