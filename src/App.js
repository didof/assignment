import React, { useState } from 'react';
import styled from 'styled-components';
import Encoder from './features/encoder/encoder';
import Decoder from './features/decoder/decoder';

import Header from './components/Header';
import List from './components/List';
import TextAreaWithButton from './components/TextAreaWithButton';
import TextAreaReadOnly from './components/TextAreaReadOnly';

import { Column, Row, Spacer } from './styled-components/Aligners';
import { Card } from './styled-components/Cards';
import { Button } from './styled-components/Buttons';

const Skin = styled.div`
	font-family: verdana, sans-serif;
	background-color: rgba(0, 0, 0, 0.1);

	height: 100vh;
	width: 100vw;

	display: flex;
	justify-content: space-around;
	aling-items: center;
`;

const defaultValue = '';

const App = () => {
	const [text, setText] = useState(defaultValue);
	const [encodedOutput, setEncodedOutput] = useState('');
	const [list, setList] = useState([]);
	const [decodedOutput, setDecodedOutput] = useState('');

	function clearTextHandler() {
		setText((prevText) => defaultValue);
	}

	function changeTextHandler(e) {
		const val = e.target.value;
		if (val[val.length - 1] === '\n') return;
		setText((prevText) => val);
	}

	function primaryActionHandler() {
		const encoder = new Encoder(text);
		encoder.encode();

		const encoded = encoder.getOutput();
		setEncodedOutput((prevOutput) => encoded);

		const list = encoder.retrieveOriginalFromShuffled();
		setList((prevList) => list);
	}

	function secondaryActionHandler() {
		const decoder = Decoder.withCheck(encodedOutput, list);
		if (!decoder.isValid) {
			alert('Sorry, the test that you submitted seems to be not encoded');
			return;
		}
		decoder.decode();
		const decoded = decoder.getOutput();
		setDecodedOutput((prevDecoded) => decoded);
	}

	return (
		<Skin>
			<Column spaceEvenly>
				<Header size={1} b>
					WeirdText
				</Header>
				<Row spaceAround>
					<Spacer />
					<Card>
						<Column spaceEvenly>
							<Header size={2} b>
								Encoder
							</Header>
							<Header size={3}>Input</Header>
							<Header size={6}>Text to decode:</Header>
							<TextAreaWithButton
								btnLabel='encode'
								value={text}
								change={changeTextHandler}
								clear={clearTextHandler}
								primaryAction={primaryActionHandler}
							/>
						</Column>
					</Card>
					<Spacer />
					{/* The card is built in such a way that simply adding the "sharp"
					 property (making it "true") you get a version with sharp corners */}
					<Card sharp>
						<Header size={6} b>
							List of the original words that got encoded
						</Header>

						<List values={list} />
					</Card>
					<Spacer />
					<Card>
						<Column>
							<Header size={2} b>
								Output
							</Header>
							<Header size={4}>Encoded text</Header>
							<TextAreaReadOnly value={encodedOutput} />

							<Header size={3}>Output</Header>
							<Header size={4}>Dencoded text</Header>
							<TextAreaReadOnly value={decodedOutput}>
								<DecodeButton action={secondaryActionHandler} />
							</TextAreaReadOnly>
						</Column>
					</Card>
					<Spacer />
				</Row>
			</Column>
		</Skin>
	);
};

/*
By taking advantage of the flexibility of TextAreaReadOnly it is possible to
add any children within it.
*/
const DecodeButton = ({ action }) => {
	return <Button onClick={action}>Decode</Button>;
};

export default App;
