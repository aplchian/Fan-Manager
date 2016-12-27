import React from 'react'

const ScheduleItem = ({title, duration, start}) => (
  <div className="schedule-item">
    <div className="event-title">{title}</div>
    <div className="event-duration">{duration}</div>
    <div className="start-time">{start}</div>
  </div>
)
export default ScheduleItem
