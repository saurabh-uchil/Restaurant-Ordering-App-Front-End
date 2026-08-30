import { useState } from "react";

export const useSidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen ] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    return { isSidebarOpen, toggleSidebar, closeSidebar}
}