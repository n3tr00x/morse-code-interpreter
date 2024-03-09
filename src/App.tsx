import { KeyboardEvent, useState } from 'react';
import { CONFIG } from './constants/config';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { MorseCode } from './components/MorseCode';
import { Interpreter } from './components/Interpreter';

export function App() {
	const [morseCode, setMorseCode] = useState('');
	const [lastTimePressed, setLastTimePressed] = useState<number | undefined>(undefined);
	const [isKeyPressed, setIsKeyPressed] = useState(false);

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

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (isKeyPressed) {
			return;
		}

		setIsKeyPressed(true);

		switch (event.code) {
			case 'Space':
			case 'ArrowUp':
			case 'ArrowDown':
				addSpace();
				break;
			default:
				console.error('error.');
				break;
		}
	};

	const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
		switch (event.code) {
			case 'Space':
			case 'ArrowUp':
			case 'ArrowDown':
				addMorseChar();
				break;
			default:
				console.error('error');
		}

		setIsKeyPressed(false);
	};

	return (
		<main className="main" tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
			<div className="container">
				<Header />
				<div className="io-container">
					<MorseCode code={morseCode} />
					<Interpreter code={morseCode} />
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
