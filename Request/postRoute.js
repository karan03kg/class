const http = require ("http");
const fs = require ("fs");
const event = require("events")
const qs = require ("querystring")

function getBody(request){
    return new Promise((resolve)=>{
        const bodyParts = [];
        let body;
        request.on('data',(chunk)=>{
            bodyParts.push(chunk);  //pushing buffer into body
        }).on('end',()=>{

        })
    })
}