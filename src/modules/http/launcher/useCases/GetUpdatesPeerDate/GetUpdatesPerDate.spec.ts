import { beforeEach, describe, expect, it } from "vitest";
import { IUpdatesRepository } from "../../repositories/IUpdatesRepository";
import { GetUpdatesPerDate } from "./GetUpdatesPerDate";
import { InMemoryUpdatesRepository } from "../../repositories/in-memory/InMemoryUpdatesRepository";
import { Update } from "../../domain/Update";

let updatesRepository: IUpdatesRepository
let getUpdatesPerDate:  GetUpdatesPerDate

describe("Get Updates", () => {
  beforeEach(async () => {
    updatesRepository = new InMemoryUpdatesRepository()
    getUpdatesPerDate = new GetUpdatesPerDate(updatesRepository)
    

    
    for (let i = 1; i <= 5; i++) {
      const update = Update.create({
        directory: '/', 
        download: '', 
        product: 'Update',  
        version: '1.0',
        sha1: "",
        release: new Date("2020-12-10T03:24:00").toISOString(),
        rm: []
      })
      
      await updatesRepository.create(update)
    }
  })
  
  it('should able to get latest updates', async () => {
    const response = await getUpdatesPerDate.execute({date: '2020-07-29T17:41:07.013Z'})
    expect(response.data.length).toEqual(5)
  })
})