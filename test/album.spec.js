import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

import { getAlbum, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album Methods', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbuns method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR');
      getAlbum('1rQZbncicoXyB64DqoH7OY');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/1rQZbncicoXyB64DqoH7OY');
    });

    it('should return the correct data from Promisse', () => {
      const albums = getAlbum('2i6nd4FV6y7K9fln6eelmR');

      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
