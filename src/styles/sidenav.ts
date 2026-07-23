export const sideNavStyles = {
  container:
    "fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-[#E7DFD5] bg-[#FCFBF9] p-4 transition-transform duration-300 ease-in-out md:sticky md:top-16 md:z-auto md:translate-x-0",

  open: "translate-x-0",

  closed: "-translate-x-full",

  overlay:
    "fixed inset-0 z-40 bg-black/40 md:hidden",

  nav:
    "flex flex-col gap-2",

  link:
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",

  activeLink:
    "bg-[#F7E2D4] text-[#E07B39]",

  inactiveLink:
    "text-[#2F2A25] hover:bg-[#F6F1EB] hover:text-[#E07B39]",

  logout:
    "mt-auto flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#8C8175] transition-colors duration-200 hover:bg-[#F6F1EB] hover:text-[#E07B39]",
};