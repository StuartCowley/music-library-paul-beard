//src/controllers/artist.js
const getDb = require('../services/db');


exports.createArtist = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {
        await db.query(
            'INSERT INTO Artist (name, genre) VALUES (?,?)',
            [
                name,
                genre
            ]
            );
         res.sendStatus(201);
    } catch (err) {
        res.status(500).json(err);
    }

    //db.close();
    await db.end();
 };

 exports.readArtist = async (req, res) => {
    const db = await getDb();

    try {
        const [artists] = await db.query('SELECT * FROM Artist');
        res.status(200).json(artists);
    } catch(err) {
        res.status(500).json(err);
    }

    await db.end();
 };

 exports.readArtistById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        artistId,
    ]);
    if (!artist) {
        res.sendStatus(404);
    } else {
        res.status(200).json(artist);
    }

    await db.end();
 };


 exports.patchArtistById = async (req, res) => {
     const db = await getDb();
     const {artistId} = req.params;
     const data = req.body;


     const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
        artistId,
    ]);

    if (!artist) {
        res.sendStatus(404);
    } else {
        await db.query('UPDATE Artist SET ? WHERE id = ?', [
            data,
            artistId
        ]);
        const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
            artistId,
        ]);
        res.status(200).json(artist);
    }

     await db.query('UPDATE Artist SET ? WHERE id = ?', [
         data,
         artistId
     ]);

     await db.end();

 };
