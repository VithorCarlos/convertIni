export interface MusicRequestDTO {
  code: string;
  artist: string;
  artistNormalized: string;
  music: string;
  musicNormalized: string;
  start?: string;
}

export interface IUploadIniRequestDTO {
  artista: string;
  musica: string;
  inicio: string;
}