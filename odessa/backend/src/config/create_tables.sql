-- Script de creación de tablas actualizado

-- 1. TABLA USERS
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    passwordHash VARCHAR(100) UNIQUE,
    createdAt DATETIME DEFAULT GETDATE()
  );
END
GO

-- 2. TABLA LOTIFICACIONES (Subdivisions)
-- Se crea antes que Lots porque Lots depende de esta tabla (Foreign Key)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Subdivisions]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Subdivisions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(2083),
    description VARCHAR(200),
    images VARCHAR(2083),
    department VARCHAR(30)
  );
END
GO

-- 3. TABLA LOTES (Lots)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Lots]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Lots (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_subdivisions INT,
    name VARCHAR(30) NOT NULL,
    location VARCHAR(20) NOT NULL,
    size DECIMAL(10,2),
    price DECIMAL(10,2),
    estatus VARCHAR(20) CHECK (estatus IN ('disponible', 'vendido')) DEFAULT 'disponible',
    description VARCHAR(30),
    createdAt DATETIME DEFAULT GETDATE(),
    
    FOREIGN KEY (id_subdivisions) REFERENCES dbo.Subdivisions(id)
  );
END
GO

-- 4. TABLA CLIENTES_LOTES (Users_Lots)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users_Lots]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Users_Lots (
    id_user_lot INT IDENTITY(1,1) PRIMARY KEY,
    id_user INT NOT NULL,
    id_lot INT NOT NULL,
    purchase_date DATETIME DEFAULT GETDATE(),
    payment_method VARCHAR(50),

    FOREIGN KEY (id_user) REFERENCES dbo.Users(id),
    FOREIGN KEY (id_lot) REFERENCES dbo.Lots(id)
  );
END
GO