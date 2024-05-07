export default function formatTime(timeString: string) {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }