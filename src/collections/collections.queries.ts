export const collectionQueries = {
    createCollection: `
    INSERT INTO collection (brand_id, model, number, location, credit_card) VALUES(?,?,?,?,?)`,
    readCollection: `
    SELECT model AS model,location AS location,credit_card AS credit_card
    FROM cars.collection
    WHERE brand_id = ?`,
    updateCollection: `
    UPDATE cars.collection
    SET model = ?, number = ?, location = ?, credit_card = ?
    WHERE id = ?;`,
}