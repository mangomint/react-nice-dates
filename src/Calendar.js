import React, { useState } from 'react'
import { func, instanceOf, object, objectOf, string } from 'prop-types'
import { startOfMonth } from 'date-fns'
import { isSelectable, mergeModifiers } from './utils'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import CalendarGrid from './CalendarGrid'

export default function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onHoverDate,
  onSelectDate
}) {
  const [localStateMonth, setLocalStateMonth] = useState(startOfMonth(new Date()))
  const month = receivedMonth ? startOfMonth(receivedMonth) : localStateMonth
  const handleMonthChange = onMonthChange || setLocalStateMonth

  const modifiers = mergeModifiers(
    { disabled: date => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  )

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={handleMonthChange}
      />

      <CalendarWeekHeader locale={locale} />

      <CalendarGrid
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={handleMonthChange}
        onHoverDate={onHoverDate}
        onSelectDate={onSelectDate}
      />
    </div>
  )
}

Calendar.propTypes = {
  locale: object.isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  month: instanceOf(Date),
  onMonthChange: func,
  onHoverDate: func,
  onSelectDate: func
}