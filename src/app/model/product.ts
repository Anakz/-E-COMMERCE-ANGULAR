export class Product {
    constructor(
        public name:string,
        public description:string,
        public buying_price:number,
        public selling_price:number,
        public stock:number,
        public stock_available:number,
        public weight:number,
        public id_category:number,
        public basket:Array<Object>,
        public order:Array<Object>,
        public images:Array<Object>
        ){}
}
