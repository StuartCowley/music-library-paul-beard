//src/controllers/album.js
const getDb = require('../services/db');


exports.createAlbum = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;
    const { name, year } = req.body;
    console.log('album create controller')
    console.log('create album artistID' + artistId);

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