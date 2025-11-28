-- Script de creación de tablas mínimas para desarrollo

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NULL,
    createdAt DATETIME2 DEFAULT GETDATE()
  );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Lots]') AND type in (N'U'))
BEGIN
  CREATE TABLE dbo.Lots (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200),
    price DECIMAL(18,2),
    size FLOAT,
    description VARCHAR(1000),
    createdAt DATETIME2 DEFAULT GETDATE()
  );
END