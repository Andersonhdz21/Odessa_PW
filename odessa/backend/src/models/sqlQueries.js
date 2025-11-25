module.exports = {
  createUser: `
    -- Usar OUTPUT INSERTED.id para asegurar que el id insertado se devuelve correctamente
    INSERT INTO Users (username, email, passwordHash)
    OUTPUT INSERTED.id AS id
    VALUES (@username, @email, @passwordHash);
  `,
  getUserByEmail: `
    SELECT * FROM Users WHERE email = @email;
  `,
  getUserById: `
    SELECT * FROM Users WHERE id = @id;
  `,
  createLot: `
    INSERT INTO Lots (name, location, price, size, description)
    OUTPUT INSERTED.*
    VALUES (@name, @location, @price, @size, @description);
  `,
  getAllLots: `
    SELECT * FROM Lots ORDER BY id ASC;
  `,
  getLotById: `
    SELECT * FROM Lots WHERE id = @id;
  `,
  updateLot: `
    UPDATE Lots
    SET name = @name,
        location = @location,
        price = @price,
        size = @size,
        description = @description
    WHERE id = @id;
    SELECT * FROM Lots WHERE id = @id;
  `,
  deleteLot: `
    DELETE FROM Lots WHERE id = @id;
  `
};