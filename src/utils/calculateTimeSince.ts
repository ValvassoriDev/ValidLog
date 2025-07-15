export function calculateTimeSince(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}d ${diffInHours % 24}h atrás`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ${diffInMinutes % 60}m atrás`;
  } else {
    return `${diffInMinutes}m atrás`;
  }
}
