import { User } from "./user";

export class Payment {
    constructor(
        public id:number,
        public paid_date:Date,
        public amount:number,
        public user:User,
        public is_deleted:boolean
    ){}
}
