# node-rest-api-test

## Purpose

This is the test project created in aim to practice the following technologies:
express, express-validator, mongoose, mocha, autogenerated swagger

## Basic usage

GET One http://localhost:3000/api/receipts/<ID>
GET http://localhost:3000/api/receipts/
PUT http://localhost:3000/api/receipts/<ID>

## Testing

The Integration tests are created by using mocha, supertest, should

## Project configs

You have to specify the following process variables in .env config file
PORT
DBNAME
MONGODB_CONN
