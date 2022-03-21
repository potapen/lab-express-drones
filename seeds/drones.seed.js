// Iteration #1
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lab-express-drones')
.then(x => console.log('connected to: ', x.connection.name))
.catch(error => console.error('error: ', error))

const DroneModel = require('../models/Drone.model.js')

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];


async function populateDrones(){

    const promisesArray = drones.map( drone =>{
      return DroneModel.create(drone)
    })
    await Promise.all(promisesArray)
}

async function main(){
    try{
        await populateDrones()
        const dronesNumber = await DroneModel.countDocuments()
        console.log('dronesNumber: ', dronesNumber)
    }
    catch(error){console.error(error)}

    mongoose.connection.close()
}

main()
