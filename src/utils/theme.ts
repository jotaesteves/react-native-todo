export const colors = {
  light: {
    primary: "bg-blue-500",
    primaryHover: "bg-blue-600",
    background: "bg-gray-50",
    cardBackground: "bg-white",
    headerBackground: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-400",
    border: "border-gray-200",
    borderMuted: "border-gray-100",
    danger: "bg-red-50",
    dangerBorder: "border-red-200",
    dangerText: "text-red-600",
    success: "bg-green-500",
    successBorder: "border-green-500",
    placeholder: "#9CA3AF",
  },
  dark: {
    primary: "bg-blue-600",
    primaryHover: "bg-blue-700",
    background: "bg-gray-900",
    cardBackground: "bg-gray-800",
    headerBackground: "bg-gray-800",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    textMuted: "text-gray-500",
    border: "border-gray-700",
    borderMuted: "border-gray-600",
    danger: "bg-red-900/20",
    dangerBorder: "border-red-800",
    dangerText: "text-red-400",
    success: "bg-green-600",
    successBorder: "border-green-600",
    placeholder: "#6B7280",
  },
};

export function getThemeColors(isDark: boolean) {
  return isDark ? colors.dark : colors.light;
}

export function getThemeClass(lightClass: string, darkClass: string, isDark: boolean) {
  return isDark ? darkClass : lightClass;
}
