// tests/album-create

const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
  let db;
  let artistEntryId;

  beforeEach(async () => {
    db = await getDb();
    //create artist - required for album creation
    await db.query('INSERT INTO Artist (name, genre) VALUES(?,?)', [
        'Dire Straits',
        'rock',
    ]);
    
    // retrieve artist.Id from db for 'Dire Straits' 
    // and assign id to artistRefId
    const [[artistEntries]] = await db.query(
      `SELECT * FROM Artist WHERE name = 'Dire Straits'`
    );
    artistRefId = artistEntries.id;
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.end();
  });

  describe(`/artist/:artistId/album`, () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
  
        const res = await request(app)
          .post(`/artist/${artistRefId}/album`)
          .send({
            name: 'Sultans of Swing',
            year: '1998',
            artistId: artistRefId
          });

        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = 'Sultans of Swing'`
        );

        expect(albumEntries.name).to.equal('Sultans of Swing');
        expect(albumEntries.year).to.equal(1998);
        expect(albumEntries.artistId).to.equal(artistRefId);
      });
    });
  });
});