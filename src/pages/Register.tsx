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

type RegisterForm = {
  restaurantName: string;
  restaurantDescription: string;  
  email: string;
  password: string;
  username: string;
};

const Register = () => {
  const {register, handleSubmit, formState, reset} = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      restaurantName: "",
      restaurantDescription:"",
      username: ""  
    },
  });

  const {errors} = formState;
  
  const mutation = useMutation(
    {
        mutationFn: async (data: RegisterForm) => {
        const response = await axios.post('http://localhost:3000/auth/register', data);
        return response.data
        },
        onSuccess: (data) => {
            console.log('Registered Successfully');
            console.log(data);
            reset();
        },
        onError: (error) => {
            if (axios.isAxiosError(error)){
                console.log(error.response?.data);
                console.log(error.response?.status);
            } 
            else {
            console.error(error);
            }
        },
    }
  );
  const onFormSubmit = (data: RegisterForm) =>{
    mutation.mutate(data);
  }  

  return (
    <div className={style.page}>
        <Navbar />
        <div className={style.div}>
            <div className={style.container}>
            
                {/* <div className={style.logoContainer}>
                <div className={style.logoDot} />
                <span className={style.logoText}>The Pass</span>
                </div> */}

                <h1 className={style.title}>
                Set up your restaurant
                </h1>

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
                    
                   <ButtonWithLoader text="Register" loadingText="Registering user..." isLoading={mutation.isPending} />
                    
                    {mutation.isSuccess && <AlertMessage type="success" message="Registered Successfully!!"/>}

                    {mutation.isError && <AlertMessage type="error" message={mutation.error.message} />}

                </form>
            
            </div>  
        </div>
    </div>
  )
}

export default Register
