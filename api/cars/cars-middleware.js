const Cars = require('./cars-model')
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id)
    if(car){
      req.car = car;
      next()
    }else{
      res.status(404).json({ message: "car with id <car id> is not found" })
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin){
    res.status(400).json({ message: `vin is missing` })
  }else{
    if(!req.body.make){
      res.status(400).json({ message: `make is missing` })
    }else{
      if(!req.body.model){
        res.status(400).json({ message: `model is missing` })
      }else{
        if(!req.body.mileage){
          res.status(400).json({ message: `mileage is missing` })
        }else{
          next();
        }
      }
    }
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)){
    next()
  }else{
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const car = await Cars.getAll()
    const vinNums = []
    car.map(c => {
      vinNums.push(c.vin)
      return vinNums;
    })
    if(vinNums.includes(req.body.vin)){
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}