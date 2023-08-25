const { Router, Request, Response }   = require("express")

// Local import
const {
  getAllPeople,
  getPersonById,
  getAllPeopleInDB
} = require('../controllers/people')

const {
  getApiResults,
  getGenderResults,
  getAgeRangeResults
} = require('../middlewares/util')

// Router init
const router = Router()

/**
 * @param String request
 * @param Array middlewares
 * @param Promise promise
 * @return Response Json
 */
router.get('/all', [
  getApiResults,
  getGenderResults,
  getAgeRangeResults
], getAllPeople)

/**
 * @param String request
 * @param Promise promise
 * @return Response Json
 */
router.get('/:id_de_caso', getPersonById)

/**
 * @param String request
 * @param Promise promise
 * @return Response Json
 */
router.get('/', getAllPeopleInDB)

module.exports = router
