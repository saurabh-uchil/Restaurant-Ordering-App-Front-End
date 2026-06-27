import { useForm } from "react-hook-form";

const useAddToFormHook = () => {
  const methods = useForm({ mode: "all" });
  return methods;
};

export default useAddToFormHook;
