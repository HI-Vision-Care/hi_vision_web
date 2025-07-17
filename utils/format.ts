export function formatVietnameseDate(dateString: Date) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  // Lấy thứ, ngày/tháng/năm
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${dayName}, ${day}/${month}/${year}`;
}
