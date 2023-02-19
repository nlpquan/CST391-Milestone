import { Request, RequestHandler, Response } from 'express';
import * as ArtistDao from './founders.dao';

export const readFounders: RequestHandler = async (req: Request, res: Response) => {
    try {
        const artists = await ArtistDao.readFounders();

        res.status(200).json(
            artists
        );
    } catch (error) {
        console.error('[founders.controller][ReadFounders][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching founders'
        });
    }
};