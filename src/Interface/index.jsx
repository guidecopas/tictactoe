import React from "react";
import "./Interface.css";
import uuid from "react-uuid";

export default function Interface({ cells, click, colors }) {
	return (
		<div className={`interface`}>
			{cells.map((_, i) => (
				<button
					key={uuid()}
					className={`cell ${colors[i]}`}
					onClick={(_) => click(i)}>
					{cells[i]}
				</button>
			))}
		</div>
	);
}
