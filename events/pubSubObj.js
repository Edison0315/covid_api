// Local imports
const PubSub    = require('./pubSub');
const pubSub    = new PubSub()

const { fetch } = require('../services/fetch')
const Person    = require('../database/entities/person')

/*
 * @param String createdCandidate
 * @param Promise promise
 * @void
*/
pubSub.subscribe('getNewCovidInformation', async() => {

  try {

    // Get info DB
    let db_person  = await Person.findAll({ attributes: ['id_de_caso'], raw : true })
    db_person      = db_person.map((p) => p.id_de_caso)

    // Get info API
    const api_person = await fetch('get', 'https://www.datos.gov.co/resource/gt2j-8ykr.json')

    pubSub.publish('loopingCovidInformation', { db_person, api_person })

  } catch (error) {
    console.log(error);
  }

})

/*
 * @param String createdCandidate
 * @param Promise promise
 * @void
*/
pubSub.subscribe('loopingCovidInformation', async(data) => {

  try {

    const { db_person, api_person } = data

    let people = api_person.map((p) => {
      if( !db_person.includes(p.id_de_caso) ){
        return p
      }
    })

    // Remove undefined values in arr
    people = people.filter((p) => p !== undefined)

    pubSub.publish('savingCovidInfo', people)

  } catch (error) {
    console.log(error);
  }

})

/*
 * @param String createdCandidates
 * @param Promise promise
 * @void
*/
pubSub.subscribe('savingCovidInfo', async(people) => {

  try {

    for await (person of people){
      await Person.create({
        id_de_caso: person.id_de_caso,
        fecha_reporte_web: person.fecha_reporte_web,
        fecha_de_notificaci_n: person.fecha_de_notificaci_n,
        departamento: person.departamento,
        departamento_nom: person.departamento_nom,
        ciudad_municipio: person.ciudad_municipio,
        ciudad_municipio_nom: person.ciudad_municipio_nom,
        edad: person.edad,
        unidad_medida: person.unidad_medida,
        sexo: person.sexo,
        fuente_tipo_contagio: person.fuente_tipo_contagio,
        ubicacion: person.ubicacion,
        estado: person.estado,
        recuperado: person.recuperado,
        fecha_inicio_sintomas: person.fecha_inicio_sintomas,
        fecha_diagnostico: person.fecha_diagnostico,
        fecha_recuperado: person.fecha_recuperado,
        tipo_recuperacion: person.tipo_recuperacion,
        per_etn_: person.per_etn_
      })
    }

  } catch (error) {
    console.log(error);
  }

})

module.exports = pubSub

