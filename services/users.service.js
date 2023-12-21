import {client} from "../index.js";

export async function createUser(data) {
    return await client.db("b41wd").collection("users").insertOne(data);
}
export async function getUserByName(username) {
    console.log("username is"+username);
    return await client.db("b41wd").collection("users").findOne({ username: username});
}