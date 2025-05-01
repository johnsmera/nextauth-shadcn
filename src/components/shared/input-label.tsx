import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface InputLabelProps extends React.ComponentProps<"input"> {
	label: string;
}

export const InputLabel = ({
	className,
	label,
	type,
	id,
	placeholder,
	...props
}: InputLabelProps) => {
	return (
		<div className="space-y-4">
			<Label htmlFor={id}>{label}</Label>
			<Input 
				type={type} 
				id={id} 
				placeholder={placeholder} 
				className={cn("w-full h-12", className)}
				{...props} 
			/>
		</div>
	);
};
