"use client";

import { Input } from "@/components/Inputs/Input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye as ShowIcon, EyeClosed as HideIcon } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type TPasswordTypes = "password" | "confirmPassword";

type TFieldTypes =
  | "fullName"
  | "email"
  | "userName"
  | TPasswordTypes
  | "gender";

interface IInputs {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
}

const genderRadioButtonList = [
  { id: "male", value: "male" },
  { id: "female", value: "female" },
];

const passwordFieldList: Array<{
  id: TPasswordTypes;
  label: string;
}> = [
  {
    id: "password",
    label: "Password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
  },
];

const Form = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

  const handleClickPasswordToggle = (id: TPasswordTypes) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <form
      className="flex flex-col w-full gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* basic info ======== */}
      <Input placeholder="Full name" {...register("fullName")} />
      <Input placeholder="User Name" {...register("userName")} />
      <Input placeholder="Email" type="email" {...register("email")} />

      {/* gender section======== */}
      <div className="flex items-center justify-between gap-3 px-2 bg-accent rounded-sm py-2.5 text-muted-foreground flex-wrap">
        <Label htmlFor="r1" className="text-sm font-medium capitalize">
          gender
        </Label>
        <RadioGroup
          defaultValue="male"
          {...register("gender")}
          className="flex items-center gap-3 flex-wrap"
        >
          {genderRadioButtonList.map(({ id, value }) => (
            <div
              key={id}
              className="flex items-center space-x-2 cursor-pointer capitalize text-sm"
            >
              <RadioGroupItem value={value} id={id} />
              <Label htmlFor={id} className="cursor-pointer">
                {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* password======== */}
      {passwordFieldList.map(({ id, label }) => {
        const isShown = showPassword[id];

        return (
          <div className="flex" key={id}>
            <Input
              placeholder={label}
              {...register(id)}
              type={isShown ? "text" : "password"}
              className="rounded-tr-none rounded-br-none"
            />
            <Button
              size={"icon"}
              className="rounded-sm rounded-tl-none rounded-bl-none"
              onClick={handleClickPasswordToggle(id)}
            >
              {isShown ? <HideIcon size={20} /> : <ShowIcon size={20} />}
            </Button>
          </div>
        );
      })}

      {/* keep me logged in checkbox ======== */}
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Checkbox id="save-my-logged-in-check" />
        <label
          htmlFor="save-my-logged-in-check"
          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-primary/80"
        >
          Keep me logged in
        </label>
      </div>
      <Button className="mt-2" type="submit">
        Signup
      </Button>
    </form>
  );
};

export default Form;
