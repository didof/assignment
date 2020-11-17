import React, { useState } from 'react';
import styled from 'styled-components';
import Encoder from './features/encoder/encoder';
import Decoder from './features/decoder/decoder';

import Header from './components/Header';
import List from './components/List';
import TextAreaWithButton from './components/TextAreaWithButton';
import TextAreaReadOnly from './components/TextAreaReadOnly';

const Skin = styled.div`
	font-family: sans-serif;
`;

const App = () => {
	const defaultValue = '';
	const [text, setText] = useState(defaultValue);
	const [output, setOutput] = useState('');
	const [list, setList] = useState([]);

	const [decodedOutput, setDecodedOutput] = useState('');

	function clearTextHandler() {
		setText((prevText) => defaultValue);
	}

	function changeTextHandler(input) {
		setText((prevText) => input);
	}

	function primaryActionHandler() {
		const encoder = new Encoder(text);
		encoder.encode();

		const encoded = encoder.getOutput();
		setOutput((prevOutput) => encoded);

		const list = encoder.retrieveOriginalFromShuffled();
		setList((prevList) => list);
	}

	function secondaryActionHandler() {
		const decoder = Decoder.withCheck(output, list);
		if (decoder.isNotValid) {
			console.error('is not valid');
			return;
		}
		decoder.decode();
		const decoded = decoder.getOutput();
		setDecodedOutput((prevDecoded) => decoded);
	}

	return (
		<Skin>
			<Header>WeirdText</Header>
			<Header size={2}>Encoder</Header>
			<Header size={3}>Input</Header>
			<Header size={4}>Text to decode: {text}</Header>
			<TextAreaWithButton
				btnLabel='encode'
				value={text}
				change={changeTextHandler}
				clear={clearTextHandler}
				primaryAction={primaryActionHandler}
			/>

			<Header size={3}>Output</Header>
			<Header size={4}>Encoded text</Header>
			<TextAreaReadOnly value={output} />

			<Header size={4}>List of the original words that got encoded</Header>
			<List values={list} />

			<Header size={3}>Output</Header>
			<Header size={4}>Dencoded text</Header>
			<TextAreaReadOnly value={decodedOutput}>
				<DecodeButton action={secondaryActionHandler} />
			</TextAreaReadOnly>
		</Skin>
	);
};

const DecodeButton = ({ action }) => {
	return <button onClick={action}>Decode</button>;
};

export default App;
