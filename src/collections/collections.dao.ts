import { execute } from "../services/mysql.connector";
import { Collection } from "./brands.model";
import { collectionQueries } from './collections.queries';

export const readCollection = async (albumId: number) => {
    return execute<Collection[]>(collectionQueries.readCollection, [albumId]);
};

export const createCollection = async (collection: Collection, index: number, albumId: number) => {
    return execute<Collection[]>(collectionQueries.createCollection, [albumId, collection.model, collection.number, collection.location, collection.credit_card]);
};

export const updateCollection = async (collection: Collection) => {
    return execute<Collection[]>(collectionQueries.updateCollection, [collection.model, collection.number, collection.location, collection.credit_card, collection.collectionId]);
};