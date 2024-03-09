import { useEffect, useState } from 'react';
import { ALFABHET } from '../constants/alfabhet';

type InterpreterProps = { code: string };

export function Interpreter({ code }: InterpreterProps) {
	const [decodedText, setDecodedText] = useState('');

	useEffect(() => {
		const decodeMorse = () => {
			const words = code.trim().split(' / ');

			const decodedWords = words.map(word => {
				const letters = word.split(' ');
				const decodedLetters = letters.map(letter => ALFABHET[letter] || '');
				return decodedLetters.join('');
			});

			setDecodedText(decodedWords.join(' '));
		};

		decodeMorse();
	}, [code]);

	return (
		<div className="interpreter">
			<h2>Output</h2>
			<p>{decodedText}</p>
		</div>
	);
}
