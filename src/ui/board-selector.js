import * as React from "react";
import cx from "clsx";
import { presets } from "./presets";
import { scope } from "../lib/utils";
import {
	WindowsWindow,
	WindowsWindowBody,
	WindowsWindowHeader,
	WindowsCloseButton,
} from "./windows-ui";
import { Radio, RadioGroup, RadioInput, RadioLabel } from "./radio";

const BoardSelector = ({ className, board, onPresetSelect: onBoardSelect }) => {
	return (
		<WindowsWindow className={cx(scope("board-selector"), className)}>
			<fieldset className={scope("board-selector__fieldset")}>
				<WindowsWindowHeader className={scope("board-selector__header")}>
					<legend className={scope("board-selector__legend")}>Presets</legend>
					<WindowsCloseButton
						role="none"
						tabIndex={-1}
						style={{ pointerEvents: "none" }}
					/>
				</WindowsWindowHeader>

				<WindowsWindowBody style={{}}>
					<RadioGroup
						name="preset"
						checked={board.name}
						onChange={(value) => {
							onBoardSelect(presets[value]);
						}}
					>
						{Object.keys(presets).map((key) => {
							return (
								<div key={key}>
									<Radio id={`preset-option-${key}`} value={key}>
										<RadioInput />
										<RadioLabel>{key}</RadioLabel>
									</Radio>
								</div>
							);
						})}
					</RadioGroup>
				</WindowsWindowBody>
			</fieldset>
		</WindowsWindow>
	);
};

export { BoardSelector };
