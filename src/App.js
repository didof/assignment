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
	// text is the one insered by the user
	const [text, setText] = useState(defaultValue);

	// encodedOutput is the result of new Encoder(text).encode() -> .getOutput()
	const [encodedOutput, setEncodedOutput] = useState('');

	// list is the result of .retrieveOriginalFromShuffled();
	const [list, setList] = useState([]);

	// decdedOutput is the result of decoder.decode() -> .getOutput();
	const [decodedOutput, setDecodedOutput] = useState('');

	function clearTextHandler() {
		setText((prevText) => defaultValue);
	}

	/*
	is prevented from adding newline and adding tabs as this would compromise the
	tokenization function (tokenize.js).
	*/
	function changeTextHandler(e) {
		const val = e.target.value;
		if (val[val.length - 1] === '\n' || val[val.length - 1] === '\t') return;
		setText((prevText) => val);
	}

	/*
	In the primary action, associated with the click on the "encode" button,
	the instantiation of an Encoder is associated.
	*/
	function primaryActionHandler() {
		// As explained in detail in encoder.js, the text provided by the user has
		// already been tokenized at this stage.
		const encoder = new Encoder(text);

		// Then then I imposed to do the token encoding.
		encoder.encode();

		// Then the tokens, some of which are possibly encoded, are recomposed into a string
		const encoded = encoder.getOutput();
		setEncodedOutput((prevOutput) => encoded);

		// A list containing only words that have actually been encoded is returned
		const list = encoder.retrieveOriginalFromShuffled();
		setList((prevList) => list);
	}

	/*
	In the secondary action, associated with the click on the "decode" button,
	an instantiation is associated which proceeds to verify if the presumed encoded
	string is truly considered encoded.
	*/
	function secondaryActionHandler() {
		const decoder = Decoder.withCheck(encodedOutput, list);

		//If not, an error is returned to the user.
		if (!decoder.isValid) {
			alert('Sorry, the test that you submitted seems to be not encoded');
			return;
		}

		// Otherwise it is called the decode method, explained in detail in decoder.js
		decoder.decode();

		// Thus, the result is retrieved and showed to the user
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
