/*
Challenge:
  1. Create a util function to filter data.
  2. Wire it up and delete unneeded code.
*/
export const getDataByPathParams = (data, locationType, locationName) => {

    return data.filter((destination) => {
        return destination[locationType].toLowerCase() === locationName.toLowerCase()
    })

}