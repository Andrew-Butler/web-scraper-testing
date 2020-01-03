/**
 * 
 * Index Api controller 
 * 
 */

//npm imports
import { Response, Request, NextFunction } from "express";

//our imports
import { ApiController } from "../ApiController";

export class AppController extends ApiController
{

    /**
     * Check that ai is still alivee
     * @param request 
     * @param response 
     * @param next 
     */
    public alive (request: Request, response: Response): void
    {
        let responseInstance = this.factoryResponse();

        responseInstance.setData("Alive")
        responseInstance.fireResponse(response);
    }
}

