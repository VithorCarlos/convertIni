import { Music } from "../Music/Music";

export interface IMusicRepository {
  upload(data: Music[]): void;
  findById(id: string): Music;
}