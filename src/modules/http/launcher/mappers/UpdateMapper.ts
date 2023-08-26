import { Update as UpdateRaw } from "@prisma/client";
import { Update } from "../domain/Update";

type PersistenceUpdateRaw = UpdateRaw


export class UpdateMapper {
  static toDomain(raw: PersistenceUpdateRaw): Update {
    const update = Update.create({
      ...raw,
      release: new Date(raw.release).toISOString()
    });

    if (update) {
      return update;
    } else {
      return null;
    }
  }

  static toPersistence(update: Update): PersistenceUpdateRaw {
    return {
      directory: update.directory,
      download: update.download,
      id: update.id,
      product: update.product,
      release: new Date(update.release),
      rm: update.rm,
      sha1: update.sha1,
      version: update.version
    }
  }
}