import {client} from "../index.js";

export async function UpdateMoviebyId(id, data) {
    return await client.db("b41wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}

export async function DeleteMoviebyId(id) {
    return await client.db("b41wd")
        .collection("movies")
        .deleteOne({ id: id });
}

export async function CreateMovies(data) {
    return await client.db("b41wd").collection("movies").insertMany(data);
}

export async function GetMoviesByID(id) {
    return await client.db("b41wd").collection("movies").findOne({ id: id });
}

export async function GetAllMovies() {
    return await client
        .db("b41wd")
        .collection("movies")
        .find({})
        .toArray();
}