export default function album() {
  return {
    getAlbum: (idAlbum) => this.request(`${this.apiURL}/albums/${idAlbum}`),
    getAlbums: (idAlbums) => this.request(`${this.apiURL}/albums?ids=${idAlbums}`),
    getAlbumTracks: (idAlbum) => this.request(`${this.apiURL}/albums/${idAlbum}/tracks`),
  };
}
