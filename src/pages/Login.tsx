import { useForm } from "react-hook-form";
import FormInput from "../components/AuthFormComponents/FormInput";
import Navbar from "../components/LandingPageComponents/Navbar";
import { authStyles as style } from "../styles/auth";
import { Lock, Mail } from "lucide-react";
import { rules } from "../data/validationRules";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AlertMessage from "../components/AuthFormComponents/AlertMessage";
import ButtonWithLoader from "../components/AuthFormComponents/ButtonWithLoader";
import { useAuth, useCurrentUser } from "../store/authStore";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState, reset } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const setAccessToken = useAuth((state) => state.setAccessToken);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) =>{
      const response = await axios.post('http://localhost:3000/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
        const {_id, username, role, restaurant, accessToken, message} = data
        console.log(message);
        setAccessToken(accessToken);
        setCurrentUser({_id, username, role, restaurant});
        reset();
        navigate("/dashboard");
    },
    onError: (error) => {
        if (axios.isAxiosError(error)){
          console.log("Axios Error");
          console.log(error.response?.data);
          console.log(error.response?.status);
        } 
        else {
            console.error(error);
        }
      },

  })

  
  const { errors } = formState;

  const onFormSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  const errorMessage = mutation.isError
  ? axios.isAxiosError(mutation.error)
    ? mutation.error.response?.data?.message ?? "Something went wrong."
    : mutation.error instanceof Error
      ? mutation.error.message
      : "Something went wrong."
  : "";
  return (
    <div className={style.page}>
      <Navbar />
      <div className={style.div}>
          <div className={style.container}>
            <h1 className={style.title}>Welcome back</h1>

            <p className={style.subtitle}>
              Sign in to your restaurant.
            </p>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormInput<LoginForm>
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                register={register}
                error={errors.email}
                rules={rules.email}
              />

              <FormInput<LoginForm>
                name="password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                register={register}
                error={errors.password}
                rules={rules.password}
              />

              <ButtonWithLoader text="Login" loadingText="Logging in..." isLoading={mutation.isPending} />
                   
              {mutation.isSuccess && <AlertMessage type="success" message="Login Successfull!!"/>}

              {mutation.isError && <AlertMessage type="error" message={errorMessage} />}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
