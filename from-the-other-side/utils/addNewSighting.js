import fs from "fs/promises";
import path from "path";
import { getData } from "./getData.js";


export async function addNewSighting(newSighting) {
    console.log('addNewSighting', newSighting);
    try {
        /*
            1. Get the existing data (remember, this will already be a JS array)
            2. Push the new sighting to it
            3. Write data to the file.
            4. Add the new sighting and check out the 'read' page.
            5. Throw an error (in the catch block) if any of 1-3 above fail.
            
            To write data:
            Import fs/promises
            Use the writeFile method with the following:
            - the relative path to the file 
            - The data (what should we do to this data first?)
            - The encoding 'utf8'
            
            Bonus: figure out how to prettify the JSON!
            Remember to uncomment the import statement in routeHandler.js!!
        */
        const sightings = await getData()
        // console.log(sightings);

        sightings.push(newSighting)
        // console.log(sightings);

        const pathJSON = path.join('data', 'data.json')

        await fs.writeFile(
            pathJSON,
            JSON.stringify(sightings, null, 2),
            'utf8'
        )
    } catch (err) {
        throw new Error(err)
    }
}