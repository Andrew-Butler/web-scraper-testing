/**
 * 
 * Base Api Controller
 * 
 */

import { ApiResponse  } from "../lib/express/ApiResponse";

export class ApiController 
{

    public apiResponse: ApiResponse;

    constructor () 
    {
        this.apiResponse = new ApiResponse();
    }

    public factoryResponse ()
    {
        return new ApiResponse();
    }
    
}