import * as React from "react";
import { Board } from "./board";
import { BoardSelector } from "./board-selector";
import { presets } from "./presets";
import { scope } from "../lib/utils";

function App() {
	let [board, setBoard] = React.useState(presets.Beginner);
	return (
		<div className={scope("app")}>
			<BoardSelector
				board={board}
				onPresetSelect={setBoard}
				className={scope("app__board-selector")}
			/>
			<Board board={board} />
		</div>
	);
}

export default App;
