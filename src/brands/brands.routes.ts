import { Router } from 'express';
import * as AlbumsController from './brands.controller';

const router = Router();
router
.route('/brand')
.get(AlbumsController.readBrand);

router
.route('/brand/:founder')
.get(AlbumsController.readAlbumsByArtist);

router
.route('/brand/search/founder/:search')
.get(AlbumsController.readAlbumsByArtistSearch);

router
.route('/brand/search/transaction/:search')
.get(AlbumsController.readAlbumsByDescriptionSearch);

router
.route('/brand')
.get(AlbumsController.createAlbum);

router
.route('/brand')
.get(AlbumsController.updateAlbum);

router
.route('/brand/:brandId')
.get(AlbumsController.deleteAlbum);

export default router;