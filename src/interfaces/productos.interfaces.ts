import { Document} from 'mongoose'

export interface Productos extends Document {
    readonly name:string;
    readonly  brand:string;
    readonly  description:string;
    readonly  imageURL:string;
    readonly  price:number;
    readonly  createAt:Date;
}