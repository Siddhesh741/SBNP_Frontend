// src/utils/dateUtils.js
export const getTodayEvents = (engagementDates, weddingDates) => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
  
    const todayEngagementDates = engagementDates[year]?.[month]?.includes(day) ? [day] : [];
    const todayWeddingDates = weddingDates[year]?.[month]?.includes(day) ? [day] : [];
  
    return { todayEngagementDates, todayWeddingDates };
  };
  