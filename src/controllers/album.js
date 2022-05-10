//src/controllers/album.js
const res = require('express/lib/response');
const getDb = require('../services/db');


exports.createAlbum = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;
    const { name, year } = req.body;

    try {
        const [[artists]] = await db.query(
            'SELECT * FROM Artist WHERE id = ?',
            [
                artistId
            ]
        );

        if (!artists) {
            res.sendStatus(404);
        } else {
            await db.query(
                'INSERT INTO Album (name, year, artistId) VALUES (?,?,?)',
                [
                    name,
                    year,
                    artistId
                ]
                );
             res.sendStatus(201);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    //db.close();
    await db.end();
 };

 exports.readAlbum = async (req, res) => {
     const db = await getDb();

     try{
         const [albums] = await db.query('SELECT * FROM Album');
         res.status(200).json(albums);
     } catch(err) {
         res.status(500).json(err);
     }

     await db.end();
 }

 exports.readAlbumById = async (req, res) => {
    const db = await getDb();
    const { albumId } = req.params;
    try {
        const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', [
            albumId,
        ])
        if(!album) {
            res.sendStatus(404);

        } else {
            res.status(200).json(album);
        }
    } catch(err) {
        res.status(500).json(err);
    }

    await db.end();
 };

exports.patchAlbumById = async (req, res) => {
    const db = await getDb ();
    const {albumId} = req.params;
    const data = req.body;
    try {
         const [
             { affectedRows },
         ] = await db.query('UPDATE Album SET ? WHERE id = ?', [
             data,
             albumId
         ]);

         if(!affectedRows) {
             res.sendStatus(404);
         } else {
             res.status(200).json(affectedRows);
         }
    } catch(err) {
        res.sendStatus(500);
    }
};

exports.deleteAlbumById = async (req, res) => {
    const db = await getDb ();
    const {albumId} = req.params;
    const data = req.body;

    try {
        const [
            {affectedRows},
        ] = await db.query('DELETE FROM Album WHERE id = ?', [
            albumId
        ]);

        if (!affectedRows) {
            res.sendStatus(404);
        } else {
            res.status(200).json(affectedRows);
        }
    } catch(err) {
        res.sendStatus(500);
    }
    await db.end;
};