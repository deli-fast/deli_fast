import { Request, Response, NextFunction } from "express"

class AppError extends Error {
    statusCode: number

    constructor(message:string, statusCode:number = 400){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

const errorHandle = async(error:Error, req:Request, res:Response, next:NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    console.error(error)

    return res.status(500).json({
        message: "Internal server error"
    })
}

export { AppError, errorHandle}