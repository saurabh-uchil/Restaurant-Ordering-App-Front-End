import { authStyles as style } from "../styles/auth";
import { useForm } from "react-hook-form";
import FormInput from "../components/AuthFormComponents/FormInput";
import { HomeIcon, Lock, Mail, Scroll, User } from "lucide-react";
import Navbar from "../components/LandingPageComponents/Navbar";
import { rules } from "../data/validationRules";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AlertMessage from "../components/AuthFormComponents/AlertMessage";
import ButtonWithLoader from "../components/AuthFormComponents/ButtonWithLoader";
import registerIllustration from "../assets/the-pass-register-illustration.png";

type RegisterForm = {
  restaurantName: string;
  restaurantDescription: string;
  email: string;
  password: string;
  username: string;
};

const Register = () => {
  const { register, handleSubmit, formState, reset } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      restaurantName: "",
      restaurantDescription: "",
      username: "",
    },
  });

  const { errors } = formState;

  const mutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      reset();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
    },
  });

  const onFormSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className={style.page}>
      <div className={style.navbar}>
        <Navbar />
      </div>

      <div className={style.authContent}>
        <div className={style.authIllustration}>
          <img
            src={registerIllustration}
            alt=""
            className={style.illustration}
          />
        </div>

        <div className={style.div}>
          <div className={style.container}>
            <h1 className={style.title}>Set up your restaurant</h1>

            <p className={style.subtitle}>
              One account, one restaurant. You can invite staff after this.
            </p>

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <FormInput<RegisterForm>
                name="username"
                type="text"
                placeholder="Enter the owner name"
                icon={User}
                register={register}
                error={errors.username}
                rules={rules.username}
              />

              <FormInput<RegisterForm>
                name="restaurantName"
                type="text"
                placeholder="Enter the restaurant name"
                icon={HomeIcon}
                register={register}
                error={errors.restaurantName}
                rules={rules.restaurantName}
              />

              <FormInput<RegisterForm>
                name="restaurantDescription"
                type="text"
                placeholder="Enter the restaurant description"
                icon={Scroll}
                register={register}
                error={errors.restaurantDescription}
                rules={rules.restaurantDescription}
              />

              <FormInput<RegisterForm>
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                register={register}
                error={errors.email}
                rules={rules.email}
              />

              <FormInput<RegisterForm>
                name="password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                register={register}
                error={errors.password}
                rules={rules.password}
              />

              <ButtonWithLoader
                text="Register"
                loadingText="Registering user..."
                isLoading={mutation.isPending}
              />

              {mutation.isSuccess && (
                <AlertMessage
                  type="success"
                  message="Registered Successfully!!"
                />
              )}

              {mutation.isError && (
                <AlertMessage
                  type="error"
                  message={mutation.error.message}
                />
              )}
            </form>
          </div>
        </div>
      </div>

      <footer className={style.authFooter}>
        <span>Powered by</span>

        <div className={style.footerLogo}>
          <span className={style.logoDot} />
          <span>The Pass</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;