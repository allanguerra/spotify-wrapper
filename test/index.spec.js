import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('shoud receive apiURL as an options', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'apiURL',
    });

    expect(spotify.apiURL).to.be.equal('apiURL');
  });

  it('should use default apiURL if it is not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'token',
    });

    expect(spotify.token).to.be.equal('token');
  });

  it('should use default token if it is not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.token).to.be.equal('BQDR07hwHnWS3H04lyPlS1uU1040bfH5OGgjeEFz3ztUV7BfWv5hSAtdaimlfEnkknHSUfsmbPlMCPCG1fpL0WON9SrmRSQ0IuH5V5RmxHdZWlOHQeCc8qjWkylNWGzjg66aIgMcvzZs');
  });

  describe('request method', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'token',
      });
      spotify.request('url');

      expect(fetchedStub).to.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      const spotify = new SpotifyWrapper({
        token: 'token',
      });
      spotify.request('url');

      expect(fetchedStub).to.been.calledWith('url');
    });

    it('should call fetch with correct headers', () => {
      const spotify = new SpotifyWrapper({
        token: 'token',
      });
      const headers = {
        headers: {
          Authorization: 'Bearer token',
        },
      };

      spotify.request('url');
      expect(fetchedStub).to.been.calledWith('url', headers);
    });
  });
});
