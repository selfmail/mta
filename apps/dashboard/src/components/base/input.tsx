import { Input as InputElement } from "@base-ui/react";
export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <InputElement
      {...props}
      className="w-full rounded-xl border border-neutral-200 bg-neutral-100 p-1.5 outline-none ring-neutral-100 transition-all focus-visible:ring-2"
    />
  );
}
