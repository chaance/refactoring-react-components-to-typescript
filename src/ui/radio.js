import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

// TODO: Styles

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
		let { id, value } = useRadioContext("RadioInput");
		let { checked, onChange, name } = useRadioGroupContext("RadioInput");

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
		let { id } = useRadioContext("RadioLabel");
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

function useRadioContext(name) {
	let ctx = React.useContext(RadioContext);
	if (!ctx) {
		throw Error(`A ${name} was rendered outside of a Radio component.`);
	}
	return ctx;
}

function useRadioGroupContext(name) {
	let ctx = React.useContext(RadioGroupContext);
	if (!ctx) {
		throw Error(`A ${name} was rendered outside of a RadioGroup component.`);
	}
	return ctx;
}
