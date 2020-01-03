import { ExpressServer } from './ExpressServer'

/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies such as services that ExpressServer needs.
 * When not using Dependency Injection, can be used as place for wiring together services which are dependencies of ExpressServer.
 */
export class Application 
{

    /**
     * Create our application
     */
    public static async createApplication() 
    {
        const expressServer = new ExpressServer();

        await expressServer.setup(8000);
        Application.handleExit(expressServer);

        return expressServer;
    }

    //bind to any exit of the application
    private static handleExit(express: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            Application.shutdownProperly(1, express);
        })
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            
            Application.shutdownProperly(2, express);
        })
        process.on('SIGINT', () => {
            Application.shutdownProperly(128 + 2, express);
        })
        process.on('SIGTERM', () => {
            Application.shutdownProperly(128 + 2, express);
        })
        process.on('exit', () => {
            console.info('Exiting');
        })
    }

    //app shut down
    private static shutdownProperly(exitCode: number, express: ExpressServer) {
        Promise.resolve()
            .then(() => express.kill())
            .then(() => {
                console.info('Shutdown complete');
                process.exit(exitCode);
            })
            .catch(err => {
                console.error('Error during shutdown', err);
                process.exit(1);
            })
    }
}
