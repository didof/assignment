import { TextArea } from '../styled-components/TextAreas';
import { Column, Spacer } from '../styled-components/Aligners';

/*
	Unlike the other Textarea, in this one I preferred to leave the developer
	free to add or not children, presumably one or more buttons.
	If there are actually children, a spacing is injected between the textarea
	and the children themselves.
*/

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
