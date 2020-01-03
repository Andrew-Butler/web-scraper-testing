/**
 * 
 * Index Api controller 
 * 
 */

//npm imports
import { Response, Request, NextFunction } from "express";

//our imports
import { ApiController } from "../ApiController";

//services
import { SiteService } from "../../module/site/SiteService";

export class SearchController extends ApiController
{

    /**
     * Check that ai is still alivee
     * @param request 
     * @param response 
     * @param next 
     */
    public async search (request: Request, response: Response): Promise<void>
    {
        let responseInstance = this.factoryResponse();

        //get inputs
        let url = request.body.url,
            selectors = request.body.selectors;
        
        //run service
        let siteService = new SiteService();
        let responseEntity = await siteService.searchWebsite(url, selectors);
        
        //set response
        responseInstance.setData(responseEntity)
        responseInstance.fireResponse(response);
    }
}

