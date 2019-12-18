//this is auth client

'use strict';

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const serverAddress = 'localhost:4250';

const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync( __dirname + '/route_guide.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const client = new proto.RouteGuide(
    serverAddress,
    grpc.credentials.createInsecure()
);

const login = (call,  callback) => {
        // console.log("In l function");
        // console.log(callback.toString());
        // console.log(proto);
        // console.log(client);
        client.login(call, (err, resp) => {
                // console.log("Inside book");
                // console.log(resp);
                // console.log(err);
                callback(resp.data);
        });
};

const signup = (call,  callback) => {
        client.signup(call, (err, resp) => {
                callback(resp.data);
        });
};

module.exports = {
        login,
        signup
};