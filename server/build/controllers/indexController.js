"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, resp) {
        console.log(' entrando no / Olá Index');
        resp.send('Olá Index');
    }
}
exports.indexController = new IndexController();
