import { Music } from "../../Music/Music";
import { IMusicRepository } from "../../repositories/IMusicRepository";

export class UploadIniUseCase {
  constructor(private musicRepository: IMusicRepository) {}

  execute(data: Music[]) {
    data.map((item) => {
      const musicAlreadyExists = this.musicRepository.findById(item.code);

      if (musicAlreadyExists) {
        throw new Error("Music Already Exists");
      }

      if (!item.code) {
        throw new Error("Music Not Exists");
      }
    });

    this.musicRepository.upload(data);
  }
}
