//npm imports
import { Request, Response, NextFunction } from "express";
import { Validator, ValidatorResult, ValidationError, validate } from "jsonschema";

//my imports
import { ApiResponse } from "../../lib/express/ApiResponse";


const validator = new Validator();

export default function (schema: any) 
{
    
    let mySchema = schema;

    return (req: Request, res: Response, next: NextFunction) => {

        
        let validateResult = validator.validate(req.body, mySchema);

        if(validateResult.valid) {
            next();
            return;
        }

        let apiRes = new ApiResponse();
        apiRes.addErrors(formatValidateErrors(validateResult.errors));
        apiRes.fireResponse(res);
    }

}

function formatValidateErrors (validateErrors: ValidationError[]) 
{
    let arr: Array<String|Number|any>  = [];

    validateErrors.forEach(validateError => {      
        arr.push(validateError.stack);
    });

    return arr;
}
