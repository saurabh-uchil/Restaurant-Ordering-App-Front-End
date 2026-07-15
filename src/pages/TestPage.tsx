import { useEffect } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";

const TestPage = () => {

    const {register, handleSubmit, formState, reset, watch} = useForm({
        mode: "all",
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const {errors} = formState;

    console.log(watch());

    useEffect(() => {
        reset({
            name: "Test Name",
            description: "Test Description"
        });
    }, []); // <-- only run once

    return (
        <div>
            <form onSubmit={handleSubmit((data)=>console.log(data))}>
                <Input 
                    id="name"
                    label="Name"
                    register={register}
                    error={errors.name}
                    rules={{required:"Name is required"}}
                />

                <Input 
                    id="description"
                    label="Description"
                    register={register}
                    error={errors.description}
                    rules={{required:"Description is required"}}
                />

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TestPage;