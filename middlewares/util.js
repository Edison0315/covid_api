const { Request, Response } = require("express")

const { fetch }                   = require('../services/fetch')

/**
 * @param Request request
 * @param Response response
 * @param Next next
 * @return Response Json | next
 */
const getApiResults = async(req = Request, res = Response, next) => {

  try {

    const people_data = await fetch('get', 'https://www.datos.gov.co/resource/gt2j-8ykr.json')

    // Set people data in req element
    req.people_data = people_data

    next()

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
 * @param Next next
 * @return Response Json | next
 */
const getGenderResults = async(req = Request, res = Response, next) => {

  try {

    const people_data = req.people_data

    // API Exception
    if(!people_data && people_data.length == 0){
      return res.status(204).json({
        message: "No content in request"
      })
    }

    // Female filter
    const female = people_data.filter((person) => person.sexo == 'F')

    // Male filter
    const male   = people_data.filter((person) => person.sexo == 'M')

    // Set both results in req object
    req.female = female
    req.male   = male

    next()

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
 * @param Next next
 * @return Response Json | next
 */
const getAgeRangeResults = async(req = Request, res = Response, next) => {

  try {

    const people_data = req.people_data

    // cero_veinte filter
    const cero_veinte = people_data.filter((person) => person.edad > 0 && person.edad <= 20)

    // veinte_cuarenta filter
    const veinte_cuarenta = people_data.filter((person) => person.edad > 20 && person.edad <= 40)

    // cuarenta_mas filter
    const cuarenta_mas = people_data.filter((person) => person.edad > 40)


    // Set both results in req object
    req.cero_veinte     = cero_veinte
    req.veinte_cuarenta = veinte_cuarenta
    req.cuarenta_mas    = cuarenta_mas

    next()

  } catch (error) {
		console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    })
  }

}

module.exports = {
  getApiResults,
  getGenderResults,
  getAgeRangeResults
};
