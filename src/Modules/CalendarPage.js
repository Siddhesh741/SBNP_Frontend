import React, { useState } from "react";
import "../Modules/CalendarPage.css";

const CalendarPage = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const years = [2024, 2025];
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 }
  ];

  const engagementDates = {
    January: [2, 3, 4, 5, 6, 8, 12, 12, 17, 22, 27, 28, 30, 31],
    February:[1, 2, 4, 6, 12, 13, 14, 17, 18, 19, 24, 26, 27, 28, 29],
    March:[3, 4, 6, 7, 11, 13, 15, 16, 17, 23, 26, 27, 30],
    April: [1, 3, 4, 5, 12, 13, 20, 21, 22, 23, 26, 28],
    May:[1, 2, 5, 10, 16, 17, 18, 19, 20, 21, 23, 24, 25],
    June:[2, 3, 12, 14, 16, 18, 19, 23, 24, 25, 26, 28, 30],
    July:[11, 12, 13, 14, 15, 19, 21, 22, 23, 25, 26, 27, 28, 30, 31],
    August:[6, 7, 8, 9, 10, 13, 14, 15, 16, 18, 19, 22, 23, 26, 27, 28],
    September:[5, 6, 7, 8, 10, 12, 14, 15, 16],
    October:[7, 9, 11, 12, 13, 16, 17, 18, 21, 28],
    November:[3, 5, 6, 8, 9, 10, 12, 13, 16, 17, 24, 25, 26, 27],
    December:[3, 4, 5, 6, 7, 11, 12, 14, 15, 23, 24, 25, 26],
    
    2025: {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    }
  };

  const weddingDates = {
    January: [2, 3, 4, 5, 6, 8, 12, 17, 27, 28, 30, 31],
    February:[1, 2, 4, 6, 12, 13, 17, 18, 24, 26, 27, 28, 29],
    March:[3, 4, 6, 16, 17, 26, 27, 30],
    April: [1, 3, 4, 5, 18, 20, 21, 22, 26, 28],
    May:[1, 2, 3, 10, 12, 13, 20, 29],
    June:[29, 30],
    July:[9, 11, 12, 13, 14, 15],
    August: [],
    September: [],
    October: [],
    November:[17, 22, 23, 25, 26, 27],
    December:[3, 4, 5, 6, 7, 11, 12, 14, 15, 20, 23, 24, 26],

    2025: {
      January: [16, 17, 18, 19, 20, 21, 23, 24, 25, 27],
      February:[3, 6, 7, 12, 13, 14, 15, 16, 18, 19, 21, 23, 25],
      March:[1, 2, 6, 7, 12],
      April: [14, 16, 18, 19, 21, 25, 29, 30],
      May:[1, 5, 6, 8, 10, 14, 15, 16, 17, 18, 22, 23, 24, 27, 28],
      June:[2, 4, 5, 7, 8],
      July: [],
      August: [],
      September: [],
      October: [],
      November:[3, 6, 8, 12, 13, 16, 17, 18, 21, 22, 23, 25, 30],
      December:[4, 5, 6],
    }
  };

  const getDatesForYear = (year, type) => {
    if (year === "2024") return type;
    if (year === "2025") return type[year] || {};
    return {};
  };

  return (
    <div className="calendar-page">
      <h1>Calendar</h1>
      <div className="year-selector">
        <label htmlFor="year">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth(""); // Reset month when year changes
          }}
        >
          <option value="">--Select Year--</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="months-container">
          {months.map((month) => (
            <div
              key={month.name}
              className={`month ${selectedMonth === month.name ? "selected" : ""}`}
              onClick={() => setSelectedMonth(month.name)}
            >
              <div className="month-number">{month.number}</div>
              <div className="month-name">{month.name}</div>
            </div>
          ))}
        </div>
      )}
      {selectedMonth && (
        <div className="dates-container">
          <h2>{selectedMonth} Dates</h2>
          <div className="date-category">
            <h3>ENGAGEMENT DATES</h3>
            <div className="dates">
              {getDatesForYear(selectedYear, engagementDates)[selectedMonth]?.length > 0 ? (
                getDatesForYear(selectedYear, engagementDates)[selectedMonth].map((date) => (
                  <div key={date} className="date">
                    {date}
                  </div>
                ))
              ) : (
                <p className="no-dates">😔No engagement date in this month</p>
              )}
            </div>
          </div>
          <div className="date-category">
            <h3>WEDDING DATES</h3>
            <div className="dates">
              {getDatesForYear(selectedYear, weddingDates)[selectedMonth]?.length > 0 ? (
                getDatesForYear(selectedYear, weddingDates)[selectedMonth].map((date) => (
                  <div key={date} className="date">
                    {date}
                  </div>
                ))
              ) : (
                <p className="no-dates">😔No wedding date in this month </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
