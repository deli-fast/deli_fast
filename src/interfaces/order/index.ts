export enum EnumOrder {
    CONCLUIDO = "concluido",
    EMANDAMENTO = "em andamento"
}


export interface IOrders {
    value: number;
    status: string;
    date: string;
   
}

export interface IOrdersResponse {
    value: number;
    status: string;
    date: Date;
    id:number;
    user:{
        name:string;
        id:string
    }
}
  