import {useForm, SubmitHandler} from "react-hook-form";
import {register} from "@swc-node/register/register";
import {Link} from "react-router-dom";

type Inputs = {
  example: string;
  exampleRequired: string;
}

export function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-amber-100">
        <input defaultValue="test" {...register("example")} className="border-2"/>
        <input type="password" {...register("exampleRequired", { required: true })} className="border-2 my-1"/>
      </div>
      <div className="text-red-500 my-1">
        {errors.exampleRequired && <span>This field is required</span>}
      </div>
      <div className="">
      <input type="submit" className="bg-amber-300 p-3 my-1 hover:bg-amber-500 transition text-white"/>
      <Link to="/">Забыли пароль?</Link>
      </div>
    </form>
  );
}
