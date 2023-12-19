import { FC } from "react";

declare interface ITextFieldProps {
    className?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    type: "text" | "password";
    name: string;
    id?: string;
}

declare type ITextField = FC<ITextFieldProps>