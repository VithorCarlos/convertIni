import { MusicRepository } from "../../repositories/implementations/MusicRepository";
import { UploadIniUseCase } from "./UploadIniUseCase";
import { UploadIniController } from "./UploadIniUseController";

const musicRepository = new MusicRepository();
const uploadIniUseCase = new UploadIniUseCase(musicRepository);
const uploadIniController = new UploadIniController(uploadIniUseCase);

export {uploadIniController}