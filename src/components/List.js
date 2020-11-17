const List = ({ values }) => {
	return (
		<ul>
			{values.map((el) => {
				return <li key={`${Math.random()}-${el}`}>{el}</li>;
			})}
		</ul>
	);
};

export default List;
