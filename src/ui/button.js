import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

const Button = React.forwardRef(
	(
		{
			children,
			type: buttonType = "button",
			className,
			onPointerDown,
			onPointerUp,
			...props
		},
		forwardedRef
	) => {
		let [metaPress, setMetaPress] = React.useState(false);
		React.useEffect(() => {
			if (metaPress) {
				let listener = () => {
					setMetaPress(false);
				};
				window.addEventListener("pointerup", listener);
				return () => {
					window.removeEventListener("pointerup", listener);
				};
			}
		}, [metaPress]);

		return (
			<button
				ref={forwardedRef}
				type={buttonType}
				className={cx(scope("button"), className)}
				data-meta-pressed={metaPress ? "" : undefined}
				onPointerDown={(event) => {
					if (event.metaKey) {
						setMetaPress(true);
					}
					onPointerDown(event);
				}}
				onPointerUp={(event) => {
					setMetaPress(false);
					onPointerUp(event);
				}}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button };
