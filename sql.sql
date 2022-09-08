CREATE DATABASE examen;

use examen;

CREATE TABLE cuenta(
nro_cuenta nvarchar(14) primary key,
tipo char(3),
moneda char(3),
nombre nvarchar(40),
saldo decimal(12,2)
);

CREATE TABLE movimiento(
nro_cuenta nvarchar(14) primary key,
fecha datetime ,
tipo char(1),
importe decimal(12,2),
tipo_cambio decimal(15,5),
glosa nvarchar(25)
);