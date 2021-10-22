import * as React from "react";
import cx from "clsx";
import { Button } from "./button";
import { IconWindowsClose } from "./icons";
import { scope } from "../lib/utils";

const WindowsBox = React.forwardRef((props, forwardedRef) => {
	let { children, className, inset, depth = 2, ...domProps } = props;
	return (
		<div
			ref={forwardedRef}
			data-inset={inset ? "" : undefined}
			className={cx(className, scope("windows--box"))}
			data-depth={depth}
			{...domProps}
		>
			{children}
		</div>
	);
});

WindowsBox.displayName = "WindowsBox";

const WindowsWindow = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<WindowsBox
				ref={forwardedRef}
				className={cx(scope("windows--window"), className)}
				{...props}
				inset={false}
			>
				{children}
			</WindowsBox>
		);
	}
);
WindowsWindow.displayName = "WindowsWindow";

const WindowsWindowHeader = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<div
				ref={forwardedRef}
				className={cx(scope("windows--window-header"), className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
WindowsWindowHeader.displayName = "WindowsWindowHeader";

const WindowsWindowBody = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<div
				ref={forwardedRef}
				className={cx(scope("windows--window-body"), className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
WindowsWindowBody.displayName = "WindowsWindowBody";

const WindowsCloseButton = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<Button
			className={cx(scope("windows--close-button"), className)}
			ref={ref}
			{...props}
		>
			<IconWindowsClose color="var(--color-black)" />
		</Button>
	);
});
WindowsCloseButton.displayName = "WindowsCloseButton";

export {
	WindowsBox,
	WindowsWindow,
	WindowsWindowBody,
	WindowsWindowHeader,
	WindowsCloseButton,
};
