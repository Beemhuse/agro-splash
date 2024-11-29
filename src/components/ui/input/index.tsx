"use client";
import React, { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface InputComponentProps<T extends FieldValues> {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  password?: boolean;
  label?: string;
  error?: string | boolean;
  labelColor?: string;
  accept?: string;
  borderStyle?: "full" | "bottom";
  name: Path<T>; // Use Path<T> for name instead of keyof T
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent = forwardRef(
  <T extends FieldValues,>(
    {
      type = "text",
      placeholder = "",
      disabled = false,
      password = false,
      label = "",
      // error = false,
      labelColor = "#000",
      accept = "",
      borderStyle = "full",
      defaultValue,
      name,
      onChange,
    }: InputComponentProps<T>,
    // ref: React.Ref<HTMLInputElement>
  ) => {
    const { register, formState: { errors } } = useFormContext<T>();

    const [passwordType, setPasswordType] = useState(password ? "password" : type);

    const togglePasswordVisibility = () => {
      setPasswordType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    };

    const passwordToggleIcon = () => {
      return passwordType === "password" ? (
        <FaEyeSlash
          className="text-accent h-5 w-5 mx-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <FaEye
          className="text-accent h-5 w-5 mx-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      );
    };

    const baseInputClass =
      "w-full py-1 px-3 outline-none border-none bg-inherit rounded-md no-number-arrows";

    const borderClass =
      borderStyle === "bottom"
        ? "border-b-2 border-accent"
        : "border border-accent rounded-md";
        const errorClass = errors[name]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-green-500 focus:border-green-500";
    return (
      <div className="grid">
        {label && (
          <p className="font-medium text-sm" style={{ color: labelColor }}>
            {label}
          </p>
        )}
        <div className="grid gap-1">
          <div
            className={`relative flex items-center py-2 bg-transparent ${borderClass} text-[#010101] text-base w-full ${
              {errorClass}
            }`}
          >
            <input
              // name={name}
              className={baseInputClass}
              type={passwordType}
              placeholder={placeholder}
              disabled={disabled}
              accept={accept}
              defaultValue={defaultValue}
              {...register(name)}

              // {...(register && register(name as never))} // Correct typing for `register`
              onChange={onChange}
            />
            {password && passwordToggleIcon()}
          </div>
          {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
        )}
        </div>
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;
