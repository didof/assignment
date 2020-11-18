import { TextArea } from '../styled-components/TextAreas';
import { Column, Row, Spacer } from '../styled-components/Aligners';
import { Button } from '../styled-components/Buttons';

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
			<TextArea
				rows={rows}
				value={value}
				onChange={(e) => change(e.target.value)}
			/>
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
