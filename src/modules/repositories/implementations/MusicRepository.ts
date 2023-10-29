import { Music } from "../../Music/Music";
import fs from "fs";
import { IMusicRepository } from "../IMusicRepository";
import path from "path";

export class MusicRepository implements IMusicRepository {
  private music: Music[] = [];

  private static INSTANCE: MusicRepository;

  public static getInstance(): MusicRepository {
    if (!MusicRepository.INSTANCE) {
      MusicRepository.INSTANCE = new MusicRepository();
    }

    return MusicRepository.INSTANCE;
  }

  findById(id: string): Music {
    const music = this.music.find((music) => music.code === id);

    return music;
  }

  upload(data: Music[]): void {
    const filePath = path.join(__dirname, '../../../../', 'public',  'output.json'); // Caminho para o arquivo

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
