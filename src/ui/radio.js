import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

const RadioGroupContext = React.createContext(null);

const RadioGroup = ({ children, checked, onChange, name }) => {
	return (
		<RadioGroupContext.Provider value={{ checked, onChange, name }}>
			{children}
		</RadioGroupContext.Provider>
	);
};

const RadioContext = React.createContext(null);

const Radio = ({ children, id, value }) => {
	return (
		<RadioContext.Provider value={{ id: String(id), value: String(value) }}>
			{children}
		</RadioContext.Provider>
	);
};

const RadioInput = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		let { id, value } = React.useContext(RadioContext);
		let { checked, onChange, name } = React.useContext(RadioGroupContext);

		return (
			<input
				{...props}
				className={cx(className, scope("radio__input"))}
				type="radio"
				id={id}
				ref={forwardedRef}
				name={name}
				value={value}
				onChange={(event) => {
					props.onChange?.(event);
					if (!event.defaultPrevented) {
						onChange(event.target.value);
					}
				}}
				checked={checked === value}
			>
				{children}
			</input>
		);
	}
);

RadioInput.displayName = "RadioInput";

const RadioLabel = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		let { id } = React.useContext(RadioContext);
		return (
			<label
				{...props}
				className={cx(scope("radio__label"), className)}
				htmlFor={id}
				ref={forwardedRef}
			>
				{children}
			</label>
		);
	}
);

RadioLabel.displayName = "RadioLabel";

export { RadioGroup, Radio, RadioInput, RadioLabel };
