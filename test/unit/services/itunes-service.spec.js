import { ItunesService } from 'services/itunes-service';

describe('iTunesService', () => {

  let iTunesService;
  let iTunesClient;
  let promiseHelper;

  beforeEach(() => {
    const promise = new Promise(function(resolve, reject) {
      promiseHelper = { resolve };
    });

    iTunesClient = { getSongsByArtist: () => promise };
    iTunesService = new ItunesService(iTunesClient);
  });

  describe('getSongsByArtist', () => {

    let response;

    beforeEach(() => {
      response = {
        json: () => {
          return {
            results: [{kind: 'song'}, {kind: 'song'}, {kind: 'song'}, {}]
          };
        }
      };
    });

    it('should retrieve songs if they exist', done => {
      iTunesService.getSongsByArtist(2)
        .then(songs => {
          expect(songs.length).toBe(3);
          done();
        })
        .catch(error => done.fail('Nothing was loaded' + error));

      promiseHelper.resolve(response);
    });
  });

});
