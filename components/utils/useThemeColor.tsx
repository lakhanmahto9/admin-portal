export const useThemeColors = (isDarkEnabled: boolean) => {
    return {
      primary: isDarkEnabled ? "#FFFFFF" : "#000000",
      secondary: isDarkEnabled ? "#EAEDF6" : "#3C4E6D",
      background: isDarkEnabled ? "#040836" : "#FFFFFF",
      topBackground:isDarkEnabled ? "#051139" : "#070a68",
      bottomBackground:isDarkEnabled ? "#051139" : "#f4f6f8",
      sidebarBg:isDarkEnabled ? "#0e1a49" : "#dae2ff",
      text: isDarkEnabled ? "#D3D3D3" : "#3C4E6D",
      graphDraw: isDarkEnabled ? "red" : "blue",
      shadowColor: isDarkEnabled ? "gray" : "gray", // Adjust as needed
      borderColor: isDarkEnabled ? "#1f2937" : "#e5e7eb", // Adjust as needed
      cardBg: isDarkEnabled ? "#0e1a49" : "#FFFFFF", // Adjust as needed
      inputBackground: isDarkEnabled ? "#EEEFF2" : "#B4DBF9", 
      headerbg:isDarkEnabled ? "#0e1a49":"#0e1a49", 
      layoutbg:isDarkEnabled?"#040836":"#025f92",
      layoutbottombg: isDarkEnabled ? "#040836" : "#f4f6f8",
      pagebg:isDarkEnabled ? "#0e1a49":"",
      pageheader: isDarkEnabled ? "#fff":"#dae2ff",
    };
  };
  