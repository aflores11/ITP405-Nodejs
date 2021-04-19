const { response } = require("express");
const express = require("express");
const axios = require("axios");
const fs = require("fs");


const app = express();

app.get('/api/github/:username', (req, response) => {

    const user = req.params.username;

    fs.readFile(`${user}.txt`,"utf8", (error, data) => {
        if(error){

            const promise = axios.get(`https://api.github.com/users/${user}`, {
                headers: {
                    Accept: "application/json",
                },
            });

            promise.then((githubResponse) => {
                const count = githubResponse.data.public_repos;

                fs.writeFile(`${user}.txt`, count, (error)=>{
                    if(error){
                        console.error(error);
                    }
                    else console.log(`Saved file for ${user}`);
                });

                response.json({
                    RepoCount: count,
                });
            });
        }
        else{
            response.json({
                RepoCount: Number(data),
            });

        }
    })

    

});

app.listen(8000);