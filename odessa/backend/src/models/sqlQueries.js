module.exports = {
  // --- USUARIOS ---
  createUser: `
    INSERT INTO Users (username, email, passwordHash, createdAt)
    OUTPUT INSERTED.id AS id, INSERTED.username, INSERTED.email
    VALUES (@username, @email, @passwordHash, GETDATE());
  `,
  getUserByEmail: `
    SELECT * FROM Users WHERE email = @email;
  `,
  getUserById: `
    SELECT * FROM Users WHERE id = @id;
  `,

  // --- LOTIFICACIONES (Subdivisions) ---
  getAllSubdivisions: `
    SELECT * FROM Subdivisions;
  `,
  getSubdivisionById: `
    SELECT * FROM Subdivisions WHERE id = @id;
  `,

  // --- LOTES (Lots) ---
  // Obtiene todos los lotes uniendo info de la lotificación
  getAllLots: `
    SELECT l.*, s.name as subdivision_name, s.department 
    FROM Lots l
    LEFT JOIN Subdivisions s ON l.id_subdivisions = s.id
    ORDER BY l.id ASC;
  `,
  // Obtiene lotes filtrados por lotificación (Vital para tu frontend)
  getLotsBySubdivision: `
    SELECT l.*, s.name as subdivision_name 
    FROM Lots l
    INNER JOIN Subdivisions s ON l.id_subdivisions = s.id
    WHERE l.id_subdivisions = @id_subdivisions
    ORDER BY l.name ASC;
  `,
  getLotById: `
    SELECT * FROM Lots WHERE id = @id;
  `,
  createLot: `
    INSERT INTO Lots (id_subdivisions, name, location, size, price, description, estatus, createdAt)
    OUTPUT INSERTED.*
    VALUES (@id_subdivisions, @name, @location, @size, @price, @description, 'disponible', GETDATE());
  `,
  updateLot: `
    UPDATE Lots
    SET name = @name,
        location = @location,
        price = @price,
        size = @size,
        description = @description,
        estatus = @estatus
    WHERE id = @id;
    SELECT * FROM Lots WHERE id = @id;
  `,
  // Para cambiar estatus a vendido rápidamente
  updateLotStatus: `
    UPDATE Lots SET estatus = @estatus WHERE id = @id;
  `,
  deleteLot: `
    DELETE FROM Lots WHERE id = @id;
  `,

  // --- COMPRAS (Users_Lots) ---
  registerPurchase: `
    INSERT INTO Users_Lots (id_user, id_lot, purchase_date, payment_method)
    VALUES (@id_user, @id_lot, GETDATE(), @payment_method);
  `
};