import { Transaction } from "./transaction.model"

export interface User {
    name: string 
    balance: number 
    transactions: Transaction[]
} 