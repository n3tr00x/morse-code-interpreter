import { useState } from 'react';
import { CONFIG } from './constants/config';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { MorseCode } from './components/MorseCode';

export function App() {
	const [morseCode, setMorseCode] = useState('');
	const [lastTimePressed, setLastTimePressed] = useState<number | undefined>(undefined);

	const addMorseChar = () => {
		const now = Date.now();
		setLastTimePressed(now);

		if (lastTimePressed) {
			const duration = now - lastTimePressed;
			const morseCharacter = duration < CONFIG.dotDuration ? '.' : '-';

			setMorseCode(prevText => prevText + morseCharacter);
		}
	};

	const addSpace = () => {
		const now = Date.now();
		setLastTimePressed(now);

		if (lastTimePressed) {
			const duration = now - lastTimePressed;
			if (duration > CONFIG.interLetterPause && duration < CONFIG.interWordPause) {
				setMorseCode(prevText => prevText + ' ');
			}

			if (duration >= CONFIG.interWordPause) {
				setMorseCode(prevText => prevText + ' / ');
			}
		}
	};

	return (
		<main className="main">
			<div className="container">
				<Header />
				<div className="io-container">
					<MorseCode code={morseCode} />
				</div>
				<div className="buttons">
					<Button onMouseDown={addSpace} onMouseUp={addMorseChar}>
						Transmit
					</Button>
				</div>
			</div>
		</main>
	);
}
