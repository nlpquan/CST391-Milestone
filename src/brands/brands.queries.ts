export const brandQueries = {
    readBrand: `
    SELECT id as brandId, make AS make, founder AS founder,
    transaction AS transaction, year AS year, vin AS vin
    FROM cars.brand`,
    readBrandByFounder: `
    SELECT id as brandId, make AS make, founder AS founder,
    transaction AS transaction, year AS year, vin AS vin
    FROM cars.brand
    WHERE cars.brand.founder = ?`,
    readBrandByFounderSearch: `
    SELECT id as brandId, make AS make, founder AS founder,
    transaction AS transaction, year AS year, vin AS vin
    FROM cars.brand
    WHERE cars.brand.founder LIKE ?`,
    readBrandByTransactionSearch: `
    SELECT id as brandId, make AS make, founder AS founder,
    transaction AS transaction, year AS year, vin AS vin
    FROM cars.brand
    WHERE cars.brand.transaction LIKE ?`,
    readBrandByBrandId: `
    SELECT id as brandId, make AS make, founder AS founder,
    transaction AS transaction, year AS year, vin AS vin
    FROM cars.brand
    WHERE cars.brand.id = ?`,
    createBrand: `
    INSERT INTO BRAND(make, founder, transaction, year, vin) VALUES(?,?,?,?,?)`,
    updateBrand: `
    UPDATE cars.brand
    SET make = ?, founder = ?, year = ?, vin = ?, transaction = ?
    WHERE id = ?`,
    deleteBrand: `
    DELETE FROM cars.brand
    WHERE id = ?`,
}