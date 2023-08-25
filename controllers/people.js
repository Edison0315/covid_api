const { Op } = require('sequelize');

const Person = require('../database/entities/person')

/**
 * @param Request request
 * @param Response response
 * @return Response Json | next
 */
const getAllPeople = async(req = Request, res = Response) => {

  try {

    const {
      female, male,
      cero_veinte, veinte_cuarenta,
      cuarenta_mas
    } = req

    return res.status(200).json({
      people: {
        female,
        male,
        "0-20": cero_veinte,
        "20-40": veinte_cuarenta,
        "40+": cuarenta_mas,
      }
    })

  } catch (error) {
		console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

/**
 * @param Request request
 * @param Response response
 * @return Response Json | next
 */
const getPersonById = async(req = Request, res = Response) => {

  try {

    const { id_de_caso } = req.params

    const person = await Person.findOne({
      where: {
        id_de_caso
      }
    })

    return res.status(200).json({
      person
    })

  } catch (error) {
		console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

/**
 * @param Request request
 * @param Response response
 * @return Response Json | next
 */
const getAllPeopleInDB = async(req = Request, res = Response) => {

  try {

    const {
      genero = '%',
      estado = '%',
      ciudad = '%'
    } = req.query

    let where = {
      sexo: {
        [Op.iLike]: `%${genero}%`
      },
      estado: {
        [Op.iLike]: `%${estado}%`
      },
      ciudad_municipio_nom: {
        [Op.iLike]: `%${ciudad.toUpperCase()}%`
      }
    }

    const people = await Person.findAll({
      where,
      raw: true
    })

    return res.status(200).json({
      people
    })

  } catch (error) {
		console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

module.exports = {
  getAllPeople,
  getPersonById,
  getAllPeopleInDB
};
