export const formatDateWithMinutes = dateString => {
  return (
    new Date(dateString).toDateString() +
    " at " +
    new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  );
};
