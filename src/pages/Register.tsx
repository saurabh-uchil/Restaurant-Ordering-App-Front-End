import { authStyles as style } from "../styles/auth";
import { useForm } from "react-hook-form";
import FormInput from "../components/AuthFormComponents/FormInput";
import { HomeIcon, Lock, Mail, User } from "lucide-react";
import Navbar from "../components/LandingPageComponents/Navbar";
import { rules } from "../data/validationRules";

type RegisterForm = {
  restaurantName: string;  
  email: string;
  password: string;
  ownerName: string;
};

const Register = () => {
  const {register, handleSubmit, formState, reset} = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      restaurantName: "",
      ownerName: ""  
    },
  });
  const {errors} = formState;

  const onFormSubmit = (data: RegisterForm) =>{
    console.log(data);
    reset();
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
                        name="ownerName"
                        type="text"
                        placeholder="Enter the owner name"
                        icon={User}
                        register={register}
                        error={errors.ownerName}
                        rules={rules.ownerName}
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
                    
                    <button type="submit" className={style.submitButton}>Register</button>   
                    
                </form>
            
            </div>  
        </div>
    </div>
  )
}

export default Register
