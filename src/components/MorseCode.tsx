type MorseCodeProps = { code: string };

export function MorseCode({ code }: MorseCodeProps) {
	return (
		<div className="morse-code">
			<h2>Input</h2>
			<p>{code}</p>
		</div>
	);
}
