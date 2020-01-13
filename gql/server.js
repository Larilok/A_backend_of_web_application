'use strict';

const fsM = require('./shared/fetcherMain.js');
const http = require("http");
const url = require("url");
const fs = require("fs");



const port = process.argv[2] || 5050;

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");


const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    booking: String,
    product: String,
    user: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    booking: () => {
        return 'Hello world!';
    },
    product: () => {
        let baseDB = new Promise((resolve, reject) => {
            fsM.fetchInventory((result) => {
                resolve(result);
            });
        });
        let supplier1 = new Promise(async (resolve, reject) => {
                fs1.fetchInventory((result) => {
                    resolve(result);
                });
        });
        let supplier2 = new Promise((resolve, reject) => {
                fs2.fetchInventory((result) => {
                    resolve(result);
                });
        });
        Promise.all([baseDB, supplier1, supplier2]).then((values) => {
            return JSON.stringify(values[0].concat(values[1]).concat(values[2]));
        });
        // fsM.fetchInventory(res => JSON.stringify(res));
    },
    user: () => {
        return 'Hello world!';
    },
};

http.createServer((req, res) => {
    const uri = url.parse(req.url).path;
    let data = '';

    if(uri === '/search') {
        req.on('data', (chunk) => {
            data += chunk;
        }).on('end', () => {
            let data2 = '{' + data.split('=')[1] + '}';
            console.log(data2);
            graphql(schema, data2, root).then((response) => {
                console.log(response.data);
                console.log(JSON.stringify(response.data));
                res.write(JSON.stringify(response.data));
                res.end();
            });
        });
    }
    if(uri === '/entry.html') {
        fs.readFile(__dirname+uri, 'binary', (err, file) => {
            console.log('------------');
            console.log(err);
            console.log(file);
            console.log('------------');

            res.write(file)
        });
    }
    // console.log(req.)
}).listen(parseInt(port, 10));

// Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//     console.log(response);
// });
