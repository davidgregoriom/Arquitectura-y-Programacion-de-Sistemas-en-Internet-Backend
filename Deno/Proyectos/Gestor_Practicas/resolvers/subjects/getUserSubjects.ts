// @deno-types="npm:@types/express@4.17.15"
import {  Request, Response} from "npm:express@4.18.2";
import { Subject } from "../../models.ts";
import { SubjectType } from "../../types.ts";

export const getUserSubjects = async (req: Request<{id_user:number}, {},{}>, res: Response<SubjectType | { error: unknown }>) => {
    try {
        const {id_user}= req.params;
        if(!id_user){
            res.status(400).json({ error: "Missing fields" }).send();
            return;
        }
        const SubjectDB = await Subject.where({ id_user:id_user}).get;
        if (SubjectDB!==undefined || Object.keys(SubjectDB).length>0) {
            res.status(200).json({ SubjectDB:Subject }).send();
        } else {

            res.status(201).json({ message: "Subjects doesn't exists" }).send();
        }
        // TODO: Send verification email using smtp module
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
