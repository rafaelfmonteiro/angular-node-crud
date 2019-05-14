import {Request, Response} from 'express'
import pool from '../database'

class GamesController {

  public async list(req : Request, resp : Response) {
    const games = await pool.query('SELECT * FROM games');
    resp.json(games)
  }

  public async getOne(req : Request, resp : Response): Promise<any> {
    const {id} = req.params
    const games =await pool.query('SELECT * FROM games where id = ?',[id]);
    if (games.length>0) {
      console.log({text: `Game ${games[0].description}`})
      return resp.json(games[0])
    }
    resp.status(404).json({text:'The game does not exists'})

  }

  public async create(req : Request, resp : Response): Promise<void> {
    console.log(req.body)
    await pool.query('INSERT INTO games SET ?',[req.body])
    resp.json({text: 'The games was created!'})
  }

  public async update(req : Request, resp : Response) {
    const {id} = req.params
    await pool.query('UPDATE games SET ? WHERE id = ?',[req.body, id])
    resp.json({text: 'The games was update!'})
  }

  public async delete(req : Request, resp : Response) {
    const {id} = req.params
    await pool.query('DELETE FROM games WHERE id = ?',[id])
    resp.json({text: 'The game is was deleted ('+ req.params.id}+')');
  }
}

export const gamesController =  new GamesController();
export default gamesController;
