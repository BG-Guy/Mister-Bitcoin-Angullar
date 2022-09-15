import { Transaction } from "./transaction.model"

export interface Contact {
    _id: string
    name: string 
    email: string 
    phone: string
    image: string
    transactions: Transaction[]
}