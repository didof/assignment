import { TextArea } from '../styled-components/TextAreas';
import { Column, Spacer } from '../styled-components/Aligners';

const TextAreaReadOnly = ({ value, children }) => {
	return (
		<Column>
			<TextArea readOnly value={value} />
			{children && <Spacer />}
			{children}
		</Column>
	);
};

export default TextAreaReadOnly;
