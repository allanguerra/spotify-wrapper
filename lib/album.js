'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _environment = require('./infra/environment');

var _environment2 = _interopRequireDefault(_environment);

var _utils = require('./infra/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAlbum = exports.getAlbum = function getAlbum(idAlbum) {
  return fetch(_environment2.default + '/albums/' + idAlbum).then(_utils2.default);
};

var getAlbums = exports.getAlbums = function getAlbums(idAlbums) {
  return fetch(_environment2.default + '/albums?ids=' + idAlbums).then(_utils2.default);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(idAlbum) {
  return fetch(_environment2.default + '/albums/' + idAlbum + '/tracks').then(_utils2.default);
};