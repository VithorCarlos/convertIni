import { FastifyReply, FastifyRequest } from "fastify";
import { UploadIniUseCase } from "./UploadIniUseCase";
import ini from "ini";
import { convertObjectKeysAndValuesToLower } from "../../../utils/convertObjectKeysAndValuesToLower";
import { removeAccents } from "../../../utils/removeAccents";
import { IUploadIniRequestDTO } from "./UploadIniUseCaseDTO";

export class UploadIniController {
  constructor(private uploadIniUseCase: UploadIniUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    try {
      const file = await request.file({
        limits: {
          fileSize: 1024 * 1024 * 10,
        },
      });

      if (!file || file.type !== "file") {
        throw new Error("No files sent");
      }

      if (file.filename.split(".")[1] !== "ini") {
        throw new Error("Send only .ini files");
      }

      const buffer = await file.toBuffer();
      const iniData = buffer.toString("latin1");

      const config = ini.parse(iniData);

      const data = [];

      for (const code of Object.keys(config)) {
        const value = config[code];
        const newValue = convertObjectKeysAndValuesToLower(
          value
        ) as IUploadIniRequestDTO;

        data.push({
          code,
          artist: newValue.artista,
          artistNormalized: removeAccents(newValue.artista),
          music: newValue.musica,
          musicNormalized: removeAccents(newValue.musica),
          start: newValue.inicio,
        });
      }

      this.uploadIniUseCase.execute(data);

      return reply
        .status(201)
        .send({ message: `Inserted ${data?.length} rowns` });
    } catch (error) {
      return reply.status(400).send({
        message: error.message || "Unexpected error",
      });
    }
  }
}
