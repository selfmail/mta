import { Input as InputElement } from "@base-ui/react";
export default function Input(
	props: React.InputHTMLAttributes<HTMLInputElement>,
) {
	return (
		<InputElement
			{...props}
			className="rounded-xl w-full  px-3 py-2 outline-none border border-neutral-800 bg-neutral-900 text-neutral-100"
		/>
	);
}
