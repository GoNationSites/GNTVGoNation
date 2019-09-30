import React, { useState, useEffect } from "react"
import dayjs from "dayjs"
import convertTime from "../helpers/convertTime"
const RecurringSlide = ({
  //   type,
  title,
  price,
  description,
  image,
  eventDays,
  isSideBySide,
  //   textPositioning,
  //   isTypeCard,
}) => {
  const daysOccuring = eventDays ? Object.keys(eventDays) : null
  const [isToday, setIsToday] = useState(false)
  const [eventType, setEventType] = useState(
    eventDays ? "recurring" : "regular"
  )

  const checkIfEventIsOnCurrentDay = () => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()
    daysOccuring.forEach(day => {
      if (currentDay === day) {
        setIsToday(true)
      }
    })
  }

  useEffect(() => {
    return eventType === "recurring" ? checkIfEventIsOnCurrentDay() : ""
  }, [])

  const renderEventDays = () => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase()

    if (eventType === "recurring") {
      return daysOccuring.map((day, idx) => {
        return (
          <span
            key={`${day}-${idx}`}
            className={`evt-day ${currentDay === day ? "is-today" : ""}`}
          >
            {day.toUpperCase()}
          </span>
        )
      })
    }
  }

  const renderHappeningNowView = () => (
    <div className={`${isSideBySide ? "column" : ""} countdown-wrapper`}>
      <div className="countdown-content">
        <p>Happening every: {renderEventDays()}</p>
        <h1 className="event-title">{title}</h1>

        <h2>
          Happening today at
          <span className="evt-hour">
            {convertTime(eventDays[daysOccuring[0]].start)}
          </span>
          to
          <span className="evt-hour">
            {convertTime(eventDays[daysOccuring[0]].end)}
          </span>
        </h2>
      </div>
    </div>
  )

  const renderUpcomingView = () => (
    <div className={`${isSideBySide ? "column" : ""} countdown-wrapper`}>
      <div className="countdown-content">
        <h3>Come in on...</h3>
        <p>Happening every: {renderEventDays()}</p>
        <h3>For</h3>
        <h1 className="event-title">{title}</h1>
        <h2>
          Happening at
          <span className="evt-hour">
            {convertTime(eventDays[daysOccuring[0]].start)}
          </span>
          to
          <span className="evt-hour">
            {convertTime(eventDays[daysOccuring[0]].end)}
          </span>
        </h2>
      </div>
    </div>
  )

  const renderEvent = () => {
    if (isToday) {
      return renderHappeningNowView()
    } else {
      return renderUpcomingView()
    }
  }

  return <React.Fragment>{renderEvent()}</React.Fragment>
}

export default RecurringSlide
