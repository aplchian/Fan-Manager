

module.exports = (startDate,endDate,artistID) => {
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  let startYear = startDate.getUTCFullYear()
  let startMonth = startDate.getUTCMonth() + 1
  let startDay = startDate.getUTCDate()
  let endYear = endDate.getUTCFullYear()
  let endMonth = endDate.getUTCMonth() + 1
  let endDay = endDate.getUTCDate()
  return {
    include_docs: true,
    startkey: [artistID,startYear,startMonth,startDay,0,0],
    endkey: [artistID,endYear,endMonth,endDay,23,59]
  }
}
