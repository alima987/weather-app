export default function getDayOfWeek(dateString: string) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }
  
  export function getDayOfMonth(dateString: string) {
    const date = new Date(dateString);
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based
    return `${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}.${month < 10 ? '0' : ''}${month}`;
  }