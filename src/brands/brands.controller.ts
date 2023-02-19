import { Request, RequestHandler, Response } from 'express';
import { Brand } from './brands.model';
import { Collection } from '../collections/brands.model';
import * as AlbumDao from './brands.dao';
import * as TracksDao from '../collections/collections.dao';
import { OkPacket } from 'mysql';

export const readBrand: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albums;
        let albumId = parseInt(req.query.albumId as string);

        console.log('brandId', albumId);
        if (Number.isNaN(albumId)) {
            albums = await AlbumDao.readBrand();
        } else {
            albums = await AlbumDao.readBrandByBrandId(albumId);
        }
        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtist: RequestHandler = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readBrandByFounder(req.params.artist);

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readBrandByFounderSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const albums = await AlbumDao.readBrandByTransactionSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(albums);
    } catch (error) {
        console.error('[albums.controller][readAlbums][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.createBrand(req.body);

        console.log('req.body', req.body);

        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Collection, index: number) => {
            try {
                await TracksDao.createCollection(track, index, okPacket.insertId);
            } catch (error) {
                console.error('[albums.controller][createAlbumTracks][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when writing album tracks'
                });
            }
        });;

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
};

export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.updateBrand(req.body);

        console.log('req.body', req.body);

        console.log('album', okPacket);

        req.body.tracks.forEach(async (track: Collection, index: number) => {
            try {
                await TracksDao.updateCollection(track);
            } catch (error) {
                console.error('[albums.controller][updateAlbum][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when updating album tracks'
                });
            }
        });;

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[albums.controller][updateAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating albums'
        });
    }
};

async function readTracks(albums: Brand[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < albums.length; i++) {
        try {
            const tracks = await TracksDao.readCollection(albums[i].brandId);
            albums[i].collections = tracks;
        } catch (error) {
            console.error('[albums.controller][readTracks][Error]', error);
            res.status(500).json({
                message: 'There was an error when fetching album tracks'
            });
        }
    }
}

export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albumId = parseInt(req.params.albumId as string);

        console.log('brandId', albumId);
        if (!Number.isNaN(albumId)) {
            const response = await AlbumDao.deleteBrand(albumId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for albumId");
        }
    } catch (error) {
        console.error('[albums.controller][deleteAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting albums'
        });
    }
};