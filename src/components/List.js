import styled from 'styled-components';

const UL = styled.ul`
	list-style-type: none;
	padding-top: 0.3em;
`;

const LI = styled.li`
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 0.3em 1em;
	border-radius: 10px;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

const List = ({ values }) => {
	return (
		<UL>
			{values.map((el) => {
				return <ListItem key={`${Math.random()}-${el}`}>{el}</ListItem>;
			})}
		</UL>
	);
};

export default List;

const ListItem = ({ children }) => {
	return <LI>{children}</LI>;
};
