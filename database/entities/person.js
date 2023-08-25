const { DataTypes, Model } = require('sequelize')
const { DB_CON }           = require('../connection')

class Person extends Model {}

Person.init({
  id_de_caso: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  fecha_reporte_web: {
    type: DataTypes.STRING,
  },
  fecha_de_notificaci_n: {
    type: DataTypes.STRING,
  },
  departamento: {
    type: DataTypes.STRING,
  },
  departamento_nom: {
    type: DataTypes.STRING,
  },
  ciudad_municipio: {
    type: DataTypes.STRING,
  },
  ciudad_municipio_nom: {
    type: DataTypes.STRING,
  },
  edad: {
    type: DataTypes.STRING,
  },
  unidad_medida: {
    type: DataTypes.STRING,
  },
  sexo: {
    type: DataTypes.STRING,
  },
  fuente_tipo_contagio: {
    type: DataTypes.STRING,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
  recuperado: {
    type: DataTypes.STRING,
  },
  fecha_inicio_sintomas: {
    type: DataTypes.STRING,
  },
  fecha_diagnostico: {
    type: DataTypes.STRING,
  },
  fecha_recuperado: {
    type: DataTypes.STRING,
  },
  tipo_recuperacion: {
    type: DataTypes.STRING,
  },
  per_etn_: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: DB_CON,
  modelName: 'Person',
  tableName: 'people',
  timestamps: false,
  schema: 'public'
})

module.exports = Person
