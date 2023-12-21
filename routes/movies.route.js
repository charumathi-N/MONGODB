import express from "express";
import {client} from "../index.js";
import {auth} from "./auth.js"
import {
    GetAllMovies,
    GetMoviesByID,
    CreateMovies,
    DeleteMoviebyId,
    UpdateMoviebyId
} from "../services/movies.service.js"
const router = express.Router();

//Task
//Create get api for movies
router.get("/",auth,async function(req,res){
    const movies = await GetAllMovies();
    console.log(movies);
    res.send(movies);
})

//get the movie details by using id - Get method
router.get("/:id",auth,async function(req,res){
    const {id} = req.params;
    console.log(id);
    const movie = await GetMoviesByID(id);
    //const data = movies.find((x)=>x.id==req.params.id);
    movie ? res.send(movie): res.status(404).send({message:"Movie not found"}); 
});

//middleware - express.json()
//api creation for post method
router.post("/",express.json(),async function(req,res){
    const data = req.body;
    // console.log(data);
    const movie = await CreateMovies(data);
    res.send(movie);
});

//api creation for Delete
router.delete("/:id",auth,async function(req,res){
   const {id} = req.params;
   try{
   const result  = await DeleteMoviebyId(id);
   console.log(result);
   result.deletedCount>0
    ? res.send({message:"Movie was deleted sucessfully"})
    :res.status(404).send({message:"Movie not found"});
   }
   catch(err){
    console.log(err);
   }
})

//api creation for update
router.put("/:id",express.json(),async function(req,res){
   const data = req.body;
   const {id} = req.params;
   const movie = await UpdateMoviebyId(id, data);
   movie ? res.send({message:"Movie updated successfully"}): res.status(404).send({message:"Movie not updated successfully"}); 
})

export default router;

