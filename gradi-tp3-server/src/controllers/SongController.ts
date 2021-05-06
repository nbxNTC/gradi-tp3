import {  Request, Response } from 'express';
import Song from '../models/Song';

export default {
    async create(request: Request, response: Response) {
        try {

        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async index(request: Request, response: Response) {
        try {
            return response.status(200).json("Teste");
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}
