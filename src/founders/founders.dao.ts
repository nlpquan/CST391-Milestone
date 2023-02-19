import { execute } from "../services/mysql.connector";
import { Founder } from "./founders.model";
import { founderQueries } from './founders.queries';

export const readFounders = async () => {
    return execute<Founder[]>(founderQueries.readFounders, []);
};