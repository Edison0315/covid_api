create table people (
	id_de_caso varchar(256) primary key not null,
	fecha_reporte_web varchar(100),
	fecha_de_notificaci_n varchar(100),
	departamento varchar(100),
	departamento_nom varchar(100),
	ciudad_municipio varchar(100),
	ciudad_municipio_nom varchar(100),
	edad varchar(100),
	unidad_medida varchar(100),
	sexo varchar(100),
	fuente_tipo_contagio varchar(100),
	ubicacion varchar(100),
	estado varchar(100),
	recuperado varchar(100),
	fecha_inicio_sintomas varchar(100),
	fecha_diagnostico varchar(100),
	fecha_recuperado varchar(100),
	tipo_recuperacion varchar(100),
	per_etn_ varchar(100)
);

----------------------------------------

INSERT INTO public.people
VALUES(
  '1556979', '2020-12-24 00:00:00',
  '2020-12-22 00:00:00', '76', 'VALLE', '76001',
  'CALI', '67', '1', 'F', 'Comunitaria', 'Casa', 'Leve', 'Recuperado',
  '2020-12-21 00:00:00', '2020-12-23 00:00:00', '2021-01-04 00:00:00',
  'Tiempo', '6');
