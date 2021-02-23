module.exports = (data, query) => {
    var value = data
    var keys = Object.keys(query)
    if(keys.length > 0){
    keys.map((keyValue,index) => {
        if(keyValue.indexOf(".") !== -1){
            var array = []
            let arrayOfKeys = keyValue.split(".")
              data.forEach((object,index2) => {
                if(object[arrayOfKeys[0]][arrayOfKeys[1]] === query[keyValue]){
                      if(query[keys[index + 1]] === object[keys[index + 1]]){
                        array.splice(0,0,object)
                      }
                      else{
                        array.push(object)
                      }
                }
              })
              value = array
        }
        else if(keyValue === "id"){
          var index = value.findIndex(object => object.id === query[keyValue])
          var valueToAddBackIn = value.slice(index,index + 1)
          value.splice(index,1)
          value.splice(0,0,valueToAddBackIn[0])
        }
      }) 
    }   
    return value
}