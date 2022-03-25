const Person = require('../models/Person')
module.exports = {
  index: async (req, res) => {
    res.json({message: 'Olá Devs!'})
  },

  create: async (req, res) => {
    // req.body
    const {name, salary, approved } = req.body;

    if(!name || !salary || !approved) {
      res.status(400).json({error: 'Fill in the fields correctly.'})
      return
    }
    const person = {
      name,
      salary,
      approved,
    }
    try {
      //criando dados
      await Person.create(person);
      res.status(201).json({message: 'Pessoa insetida no sistema com sucesso'})
    } catch (error) { 
      res.status(500).json({error: error})
    }
  },

  read: async (req, res) => {
    try {
      const people = await Person.find()
      res.status(200).json(people);
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  readPerson: async (req, res) => {
    const id = req.params.id;
    try {
      const person = await Person.findOne({_id: id})
      if(!person) {
        res.status(422).json({ messagem: 'Usuário não encontrado' })
        return
      }
      res.status(200).json(person);
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const {name, salary, approved } = req.body;
    const person = {
      name,
      salary,
      approved,
    }

    try {
      const updatedPerson = await Person.updateOne({_id: id}, person);
      console.log(updatedPerson)
      if(updatedPerson.matchedCount === 0 ) {
        res.status(422).json({ messagem: 'Atualização não encontrada' })
        return
      }
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({error: error})
    }
  },

  delete: async (req, res) => {
     const id = req.params.id;
     const person = await Person.findOne({ _id: id })
     if(!person) {
       res.status(422).json({ message: 'O usuario não foi encontrado'})
       return
     }
     try {
       await Person.deleteOne({ _id: id })
       res.status(200).json({ message: 'Usuário removido com sucesso'})
     } catch (error) {
      res.status(500).json({error: error})
     }
  }

}