-- SQLite
CREATE TABLE POSITIONS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    DESCRIPTION VARCHAR(100) NOT NULL
);

INSERT INTO POSITIONS (DESCRIPTION) 
    VALUES ('Gerente de Vendas'),
           ('Gerente de Compras'),
           ('Vendedor'),
           ('Mecânico'),
           ('Assistente Administrativo');