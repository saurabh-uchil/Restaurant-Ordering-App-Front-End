import { useState } from 'react'

const useMenuDrawerHook = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState("");

    const handleDrawerOpen = (content: string) => {
        setDrawerContent(content);
        setIsOpen(true);
    }

    const handleDrawerClose = () => {
    setIsOpen(false);
    setDrawerContent("");
}

  return {
    isOpen,
    setIsOpen,
    drawerContent,
    setDrawerContent,
    handleDrawerOpen,
    handleDrawerClose
  }
}

export default useMenuDrawerHook
