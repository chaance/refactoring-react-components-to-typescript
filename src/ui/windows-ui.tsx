import * as React from "react";
import cx from "clsx";
import { Button } from "./button";
import type { ButtonProps } from "./button";
import { IconWindowsClose } from "./icons";
import { scope } from "../lib/utils";

const WindowsBox = React.forwardRef<HTMLDivElement, WindowsBoxProps>(
	(props, forwardedRef) => {
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
	}
);

WindowsBox.displayName = "WindowsBox";

interface WindowsBoxProps extends React.ComponentPropsWithRef<"div"> {
	inset?: boolean;
	depth?: 2 | 3 | 4;
}

interface WindowsWindowProps extends React.ComponentPropsWithRef<"div"> {}

const WindowsWindow = React.forwardRef<HTMLDivElement, WindowsWindowProps>(
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

interface WindowsWindowHeaderProps extends React.ComponentPropsWithRef<"div"> {}

const WindowsWindowHeader = React.forwardRef<
	HTMLDivElement,
	WindowsWindowHeaderProps
>(({ children, className, ...props }, forwardedRef) => {
	return (
		<div
			ref={forwardedRef}
			className={cx(scope("windows--window-header"), className)}
			{...props}
		>
			{children}
		</div>
	);
});
WindowsWindowHeader.displayName = "WindowsWindowHeader";

interface WindowsWindowBodyProps extends React.ComponentPropsWithRef<"div"> {}

const WindowsWindowBody = React.forwardRef<
	HTMLDivElement,
	WindowsWindowBodyProps
>(({ children, className, ...props }, forwardedRef) => {
	return (
		<div
			ref={forwardedRef}
			className={cx(scope("windows--window-body"), className)}
			{...props}
		>
			{children}
		</div>
	);
});
WindowsWindowBody.displayName = "WindowsWindowBody";

interface WindowsCloseButtonProps extends ButtonProps {}

const WindowsCloseButton = React.forwardRef<
	HTMLButtonElement,
	WindowsCloseButtonProps
>(({ className, ...props }, ref) => {
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

export type {
	WindowsBoxProps,
	WindowsWindowProps,
	WindowsWindowBodyProps,
	WindowsWindowHeaderProps,
	WindowsCloseButtonProps,
};
export {
	WindowsBox,
	WindowsWindow,
	WindowsWindowBody,
	WindowsWindowHeader,
	WindowsCloseButton,
};
