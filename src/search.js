module.exports = (data, query) => {
    var value = data
    if(query["settings.live"]){
      let array = []
      data.forEach(((dataValue, index) => {
        if(dataValue["settings"]["live"]){
        if(query["name"] === dataValue["name"]){
            array.splice(0,0,dataValue)
          }
          else{
            array.push(dataValue)
          }
        }
      }))
      value = array
    }
    return value
}