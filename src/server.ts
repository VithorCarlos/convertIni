import fastify from "fastify";
import multipart from "@fastify/multipart";
import { uploadIniController } from "./modules/useCases/UploadIni";
import path from "path";
import fs from "fs";

const server = fastify();

server.register(multipart);

server.post("/upload", async (request, reply) => {
  return uploadIniController.handle(request, reply);
});

server.get('/download', (request, reply) => {
  const filePath = path.join(__dirname, '../public', 'output.json'); // Caminho para o arquivo
  const fileName = 'output.json'; // Nome do arquivo para o download

  // Define os cabeçalhos para forçar o download
  reply.header('Content-Disposition', `attachment; filename="${fileName}"`);
  reply.type('application/json');

  // Lê o arquivo e envia como resposta
  reply.send(fs.createReadStream(filePath));
});

server.listen({
  host: "0.0.0.0",
  port: 3333,
});
