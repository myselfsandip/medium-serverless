import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";


export default function sendResponse(c : Context,statusCode: ContentfulStatusCode ,success : boolean , message : string , data : any = null ){
    c.json({success,message,data},statusCode);
}