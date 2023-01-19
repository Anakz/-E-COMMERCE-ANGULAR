import { Basket } from "./basket";

export class User {
    constructor(
        public id:number,
        public first_name:string,
        public last_name:string,
        public phone:string,
        public address:string,
        public credit_card:string,
        public email:string,
        public password:string,
        public role:string,
        public is_deleted:boolean,
        public order?:Array<number>,
        public payment?:number,
        public basket?:Basket
    ){}
}
