export const useThemeColors = (isDarkEnabled: boolean) => {
    return {
      primary: isDarkEnabled ? "#FFFFFF" : "#000000",
      secondary: isDarkEnabled ? "#EAEDF6" : "#3C4E6D",
      background: isDarkEnabled ? "#040836" : "#FFFFFF",
      text: isDarkEnabled ? "#D3D3D3" : "#3C4E6D",
      shadowColor: isDarkEnabled ? "gray" : "gray", // Adjust as needed
      borderColor: isDarkEnabled ? "#1f2937" : "#e5e7eb", // Adjust as needed
      cardBg: isDarkEnabled ? "#051139" : "#FFFFFF", // Adjust as needed
      inputBackground: isDarkEnabled ? "#EEEFF2" : "#B4DBF9", 
    };
  };
  