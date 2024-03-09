import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button className="button" {...props}>
			{children}
		</button>
	);
}
