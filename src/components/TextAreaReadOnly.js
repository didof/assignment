const TextAreaReadOnly = ({ value, children }) => {
	return (
		<div>
			<textarea readOnly value={value} />
			{children}
		</div>
	);
};

export default TextAreaReadOnly;
