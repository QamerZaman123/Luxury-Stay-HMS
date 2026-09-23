import { createContext, useContext, useMemo, useState } from "react";

const AdminUiContext = createContext(null);

export function AdminUiProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const value = useMemo(
    () => ({
      sidebarCollapsed,
      toggleSidebar: () => setSidebarCollapsed((v) => !v),
    }),
    [sidebarCollapsed]
  );
  return <AdminUiContext.Provider value={value}>{children}</AdminUiContext.Provider>;
}

export function useAdminUi() {
  return useContext(AdminUiContext);
}
