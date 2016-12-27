

const buildMailChimp = function(data){
  const buildJson = function(item){
    return {
      "method": "POST",
      "path": "lists/22bc951064/members/",
      "body": "{\"email_address\":\"" + item.email + "\",\"status\":\"subscribed\",\"merge_fields\":{\"MMERGE3\":\"" + item.state + "\",\"MMERGE4\":\""+ item.city +"\"}}"
    }
  }
  return data.map(buildJson)

}

module.exports = {
  buildMailChimp
}
