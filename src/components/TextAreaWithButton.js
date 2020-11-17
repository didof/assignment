const TextAreaWithButton = ({
	rows = 5,
	btnLabel = 'do',
	value,
	change,
	clear,
	primaryAction,
}) => {
	return (
		<div>
			<textarea
				rows={rows}
				value={value}
				onChange={(e) => change(e.target.value)}
			></textarea>
			<button onClick={clear}>clear</button>
			<button onClick={primaryAction}>{btnLabel}</button>
		</div>
	);
};

export default TextAreaWithButton;
