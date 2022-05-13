//src/controllers/artist.js
const getDb = require('../services/db');


exports.createArtist = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
   console.log('createArtist Controller')
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

     try {
         const [
             { affectedRows },
            ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [
            data,
            artistId
        ]);
        
        if (!affectedRows) {
            res.sendStatus(404);
        } else {
            res.status(200).json(affectedRows);
        }
     } catch(err) {
         res.sendStatus(500);
     }

     await db.end();

 };

 exports.deleteArtistById = async (req, res) => {
    const db = await getDb();
    const {artistId} = req.params;
    console.log(artistId);
    try {
        const [
            {affectedRows }, 
        ] = await db.query('DELETE FROM Artist WHERE id = ?', [
            artistId
        ]);
        console.log(affectedRows);

        if (!affectedRows) {
            res.sendStatus(404);
        } else {
            res.status(200).json(affectedRows);
        }

    } catch (err) {
        res.sendStatus(500);
    }

    await db.end();
 };
