"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('hello word NodeJS Databse');
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const fs = __importStar(require("fs"));
const https = __importStar(require("https"));
const authz_1 = require("./auth/authz");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3002);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', authz_1.handleAuthorization, gamesRoutes_1.default);
    }
    start() {
        https.createServer(options, this.app).listen(this.app.get('port'), () => {
            console.log(`JSON Server is running https://localhost:${this.app.get('port')}`);
        });
    }
}
const options = {
    cert: fs.readFileSync('./src/keys/cert.pem'),
    key: fs.readFileSync('./src/keys/key.pem')
};
const server = new Server();
server.start();
