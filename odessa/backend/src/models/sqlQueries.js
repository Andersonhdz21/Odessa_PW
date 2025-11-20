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
    VALUES (@name, @location, @price, @size, @description);
    SELECT SCOPE_IDENTITY() AS id;
  `,
  getAllLots: `
    SELECT * FROM Lots;
  `
};