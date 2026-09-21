export const authStyles = {
  // Page

  page:
    "flex min-h-screen w-full flex-col bg-[#17181A] font-sans text-[#FBF8F2]",

  // Navbar

  navbar:
    "w-full shrink-0",

  // Main Layout

  authContent:
    "mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10",

  authIllustration:
    "flex w-full items-center justify-center lg:justify-start",

  illustration:
    "h-auto w-full max-w-[680px] object-contain",

  div:
    "flex w-full items-center justify-center",

  container:
    "w-full max-w-sm",

  logoContainer:
    "mb-8",

  // Heading

  title:
    "mb-2 font-heading text-3xl font-semibold text-[#FBF8F2]",

  subtitle:
    "mb-8 text-sm text-[#9A958C]",

  // Form

  form:
    "space-y-3.5",

  submitButton:
    "mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#E2793D] px-4 py-3 text-sm font-semibold text-[#FBF8F2] transition-colors duration-200 hover:bg-[#C96730] focus:outline-none focus:ring-2 focus:ring-[#E2793D]/40 disabled:cursor-not-allowed disabled:opacity-60",

  // Footer

  footer:
    "mt-6 text-center text-xs",

  loginButton:
    "font-medium",

  authFooter:
    "flex shrink-0 items-center justify-center gap-3 pb-5 text-xs text-[#6F6A63]",

  footerLogo:
    "flex items-center gap-2 font-medium text-[#9A958C]",

  logoDot:
    "h-2.5 w-2.5 rounded-full bg-[#E2793D]",

  // LoaderButton

  loader:
    "h-4 w-4 animate-spin",
};

export const illustrationStyles = {
     WebkitMaskImage: "radial-gradient(ellipse 60% 60% at center, black 20%, transparent 100%)",
     maskImage: "radial-gradient(ellipse 60% 60% at center, black 20%, transparent 100%)",      
}