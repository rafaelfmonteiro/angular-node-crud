import {Request, Response} from 'express'


class IndexController {

  public index(req : Request, resp : Response) {
      console.log(' entrando no / Olá Index')
    resp.send('Olá Index')
  }
}

export const indexController =  new IndexController();
