import axios, { AxiosInstance } from "axios";
import * as cheerio from 'cheerio';

export class SiteService
{

    public async searchWebsite (url: string, selectors: Array<string>): Promise<any>
    {   
        let responseObj: any = {};

        //fire request
        let axiosInstance = await axios({url, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36' }});

        //load into cheerio
        const cheerioInstance = cheerio.load(axiosInstance.data)

        //loop over selectors
        for (let index = 0; index < selectors.length; index++) {
            const elementSelector = selectors[index];

            //add to response object
            responseObj[elementSelector] = [];           

            //find elements
            let paragraphArray = cheerioInstance(elementSelector);

            //loop over each
            paragraphArray.each(function (index: number, element: CheerioElement) {
                let elementInstance = cheerio(element),
                    text = elementInstance.text();

                if(!text) {
                    return;
                }

                responseObj[elementSelector].push(text.replace(/(\r\n|\n|\r)/gm, "").trim());
            });
        }        

        return responseObj;
    }

}