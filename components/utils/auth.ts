export const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") || false;
};
  