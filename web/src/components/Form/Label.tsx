import { InputHTMLAttributes } from "react";

interface LabelProps extends InputHTMLAttributes<HTMLLabelElement> {
    text: string;
    htmlFor: string;
}

export function Label(props: LabelProps) {

    return (
        <label  {...props} className="font-semibold">{props.text}</label>
    )
}