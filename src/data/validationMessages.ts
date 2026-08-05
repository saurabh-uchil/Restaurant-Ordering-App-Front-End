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

export const successMsg = {
  edit:"Item updated successfully!" ,
  add:"Item added successfully!"
};

export const invalidInfoMessage = "Some information is invalid. Please check the form and try again.";
    
export const generalErrorMessage = "Something went wrong. Please try again.";

export const editItemContentStates = {
  loading: {
    type: "loading",
    title: "Loading menu item...",
  },

  error: {
    type: "error",
    title: "Error fetching menu item",
    description: "An error occurred while fetching the menu item.",
  },

  empty: {
    type: "empty",
    title: "Menu item not found",
    description: "The menu item may have been removed or no longer exists.",
  },
} as const;

export const menuContentStates = {
  loading: {
    type: "loading",
    title: "Loading menu...",
  },

  error: {
    type: "error",
    title: "Unable to load menu",
    description: "Something went wrong while loading your menu. Please try again.",
  },

  empty: {
    type: "empty",
    title: "Your menu is empty",
    description: "Add your first menu item to start building your menu.",
  },
} as const;
