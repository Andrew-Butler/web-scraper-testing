import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as bodyParser from 'body-parser';

//schema imports
import SearchSchema from "./controller/search/Schema/search.schema";

//middleware
import SchemaMiddleware from "./middleware/json-schema/SchemaMiddleware";

//controllers
import { AppController } from './controller/app/AppController';
import { SearchController } from './controller/search/SearchController'


/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer 
{
    private server?: Express;
    private httpServer?: Server;

    public async setup(port: number): Promise<Express>
    {
        //create server
        this.server = express();

        this.server.use(bodyParser.json());

        //this create routes
        this.createRoutes(this.server);

        //listen
        this.httpServer = this.listen(this.server, port)

        return this.server;
    }

    private createRoutes (express: Express) 
    {
       this.createAppRoutes(express);
       this.createSearchRoutes(express);
    }

    //route methods

    private createAppRoutes (express: Express) 
    {
        const appController = new AppController();
        express.get("/api", (req, res) => appController.alive(req, res));
    }

    private createSearchRoutes (express: Express) 
    {
        const searchController = new SearchController();
        express.post("/api/search", SchemaMiddleware(SearchSchema), (req, res) =>  searchController.search(req, res));
    }

    //listen
    public listen(server: Express, port: number) 
    {
        console.log(`Server listening at port '${port}'`);
        
        return server.listen(port)
    }

    //kill the server
    public kill() 
    {
        if (this.httpServer) {
            this.httpServer.close()
        }
    }

}
