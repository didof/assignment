import { TextArea } from '../styled-components/TextAreas';
import { Column, Row, Spacer } from '../styled-components/Aligners';
import { Button } from '../styled-components/Buttons';

/*
	In this TextArea I preferred a more strict approach to buttons.
	There are only two of them and the associated actions are passed as props.
*/

const TextAreaWithButton = ({
	rows = 5,
	btnLabel = 'do',
	value,
	change,
	clear,
	primaryAction,
}) => {
	return (
		<Column spaceBetween>
			<TextArea rows={rows} value={value} onChange={(e) => change(e)} />
			<Spacer />
			<Row spaceEvenly>
				<Button secondary onClick={clear}>
					clear
				</Button>
				<Button primary onClick={primaryAction}>
					{btnLabel}
				</Button>
			</Row>
		</Column>
	);
};

export default TextAreaWithButton;
