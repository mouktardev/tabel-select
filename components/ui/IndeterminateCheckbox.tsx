import { Check, Minus } from "lucide-react";
import { HTMLProps, useEffect, useRef } from "react";

export default function IndeterminateCheckbox({
	id,
	allRowSelectable,
	className = "",
	indeterminate,
	...rest
}: {
	allRowSelectable?: boolean;
	indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>) {
	const ref = useRef<HTMLInputElement>(null!);
	useEffect(() => {
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [ref, indeterminate, rest.checked]);
	return (
		<div className="flex items-center p-2">
			<input
				type="checkbox"
				id={id}
				ref={ref}
				className={`${className} sr-only peer`}
				{...rest}
			/>
			<label
				htmlFor={id}
				className="relative w-5 h-5 z-20 cursor-pointer rounded-md border" // original label with relative z-20 so you can select 
			/>
			{allRowSelectable && (
				<label
					htmlFor={id}
					className="absolute inset-0"
				/>
			)}
			{indeterminate && (
				<Minus className="w-5 h-5 absolute pointer-events-none" />
			)}
			<Check className="w-5 h-5 absolute pointer-events-none hidden peer-checked:block" />
		</div>
	);
}
