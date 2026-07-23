import { useForm } from "react-hook-form";
import FormInput from "../components/AuthFormComponents/FormInput";
import Navbar from "../components/LandingPageComponents/Navbar";
import { authStyles as style } from "../styles/auth";
import { Lock, Mail } from "lucide-react";
import { rules } from "../data/validationRules";
import { useNavigate } from "react-router";

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
  const { errors } = formState;

  const onFormSubmit = (data: LoginForm) => {
    console.log(data);
    reset();
    navigate('/dashboard');
  };

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

              <button type="submit" className={style.submitButton}>
                Login
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
