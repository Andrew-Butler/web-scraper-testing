import * as express from 'express'
import { Express } from 'express'
import { Server } from 'http'
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
export class ExpressServer 
{
    private server?: Express
    private httpServer?: Server

    constructor() {}

    public async setup(port: number): Promise<Express>
    {
        //create server
        this.server = express();

        //this create routes
        this.createRoutes();

        //listen
        this.httpServer = this.listen(this.server, port)

        return this.server;
    }

    private createRoutes () 
    {
            
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
