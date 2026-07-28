import type { ErrorPageProps } from "../components/ErroPageComponents/ErrorComponent";

export const UnauthorizedErrorMessage: ErrorPageProps = {
    status: 401, 
    error: "Expired",
    label: "Session", 
    code: "401 — Unauthorized", 
    heading: "Your session's gone cold", 
    description:`Looks like you've been signed out, or don't have access to this page. Log back in
        to pick up where you left off, or set up a new restaurant if you're
        just getting started.`
}

export const NotFoundErrorMessage: ErrorPageProps = {
  status: 404,
  error: "Missing",
  label: "Route",
  code: "404 — Not Found",
  heading: "Looks like this page wandered off",
  description: `The page you're looking for doesn't exist, may have been moved,
  or the URL might be incorrect. Head back to the dashboard or explore another page.`,
};

export const InternalServerErrorMessage: ErrorPageProps = {
  status: 500,
  error: "Server Error",
  label: "System",
  code: "500 — Internal Server Error",
  heading: "Our server hit a bump in the road",
  description: `Something unexpected happened while loading this page.
  Give it another try in a moment, or head back to the dashboard while we sort things out.`,
};
