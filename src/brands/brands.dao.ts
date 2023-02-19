import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Brand } from "./brands.model";
import { brandQueries } from './brands.queries';

export const readBrand = async () => {
    return execute<Brand[]>(brandQueries.readBrand, []);
};

export const readBrandByFounder = async (founderName: string) => {
    return execute<Brand[]>(brandQueries.readBrandByFounder, [founderName]);
};

export const readBrandByFounderSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Brand[]>(brandQueries.readBrandByFounderSearch, [search]);
};

export const readBrandByTransactionSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Brand[]>(brandQueries.readBrandByTransactionSearch, [search]);
};

export const readBrandByBrandId = async (brandId: number) => {
    return execute<Brand[]>(brandQueries.readBrandByBrandId, [brandId]);
};

export const createBrand = async (brand: Brand) => {
    return execute<OkPacket>(brandQueries.createBrand, [brand.make, brand.founder, brand.transaction, brand.year, brand.vin]);
};

export const updateBrand = async (brand: Brand) => {
    return execute<OkPacket>(brandQueries.updateBrand, [brand.make, brand.founder, brand.transaction, brand.year, brand.vin]);
};

export const deleteBrand = async (brandId: number) => {
    return execute<OkPacket>(brandQueries.deleteBrand, [brandId]);
};