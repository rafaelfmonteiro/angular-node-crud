console.log('hello word NodeJS Databse');
import express , {Application} from 'express'
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';
import * as fs from 'fs'
import * as https from 'https'


import {handleAuthentication} from './auth/auth'
import {handleAuthorization} from './auth/authz'

class Server {

  public app: Application;

 constructor(){
     this.app = express();
     this.config();
     this.routes();
 }

 config(): void {
    this.app.set('port', process.env.PORT || 3002)
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:false}))
 }

 routes(): void {
    this.app.use('/',indexRoutes, );
    this.app.use('/api/games', handleAuthorization, gamesRoutes );
 }

 start():void{
   https.createServer(options, this.app).listen(this.app.get('port'), () => {
     console.log(`JSON Server is running https://localhost:${this.app.get('port')}`)
   })
 }

}

const options = {
  cert : fs.readFileSync('./src/keys/cert.pem'),
  key : fs.readFileSync('./src/keys/key.pem')
}

const server = new Server();
server.start();
