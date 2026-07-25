import { create } from "zustand";

export type authState = {
    accessToken: string,
    setAccessToken: ()=>void;
}

export type userState = {
    _id:string,
    username: string,
    role: string,
    restaurant: string
}

export const useAuth = create((set) => ({
  accessToken: "",
  setAccessToken: (token:string)=>set({accessToken: token})
}));

export const useCurrentUser = create((set)=>({
    currentUser: {},
    setCurrentUser: (user:userState)=>set({currentUser:user})
}));
