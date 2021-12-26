import express from 'express';
import { isFunctionExpression } from 'typescript';
import { createServer, Server } from 'http';
const app = express();
const server = createServer(app);
server.listen(process.env.PORT || 5000);