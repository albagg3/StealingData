const mongoose = require("mongoose")
const Character = require("./character.model");

require("dotenv").config()
const mongo_uri = process.env.MONGO_DB_URI
console.log(mongo_uri)

const fetchData = async ()=>{
    try{
        const response =  await fetch("https://rickandmortyapi.com/api/character")
        const dataResponse = await response.json();
        const characterArray = []
        dataResponse.results.forEach((character) => {
            const characterObj = {
                name : character.name,
                imageUrl : character.url
            }
            characterArray.push(characterObj)
        });
        return(characterArray)
    }
    catch(error){
        console.log(error);
    }
}

const mongooseConnection = async()=>{
    try
    {
        const cleanData = await fetchData();
        console.log(cleanData)
        await mongoose.connect(mongo_uri)
        console.log("mongo Connected");
        const charactersArr = await Character.insertMany(cleanData)
        console.log(charactersArr)
    }
    catch (error)
    {
        console.log(error);
    }
}

mongooseConnection()
