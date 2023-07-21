import {v4 as uuidv4} from "uuid";
import { IdType } from "@/types/commonTypes";

const generateComponentId = (): IdType => uuidv4();

export { generateComponentId };
