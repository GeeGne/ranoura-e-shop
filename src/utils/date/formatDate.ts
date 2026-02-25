const formatDate = (dateStr: string, isEn: boolean = true) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString((isEn ? 'en' : 'ar-EG'), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default formatDate;