export const formatDate = (date: Date | string): string => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' }); // 3-letter month
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatAnnouncementDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  // for less than an hour ago
  if (diffInMinutes < 60) {
    if (diffInMinutes < 1) return 'Just now';
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  // for announcements from today
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  // for less than 7 days ago
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  return formatDate(date);
};

export const formatDateWithTime = (date: Date | string): string => {
  const dateObj = new Date(date);
  const formattedDate = formatDate(dateObj);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${formattedDate}, ${hours}:${minutes}`;
};
