import * as React from "react";

export const IconWindowsClose = React.forwardRef(({ color, ...props }, ref) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			ref={ref}
			{...props}
		>
			<path
				fill="none"
				stroke={color}
				strokeMiterlimit="10"
				strokeWidth="3"
				d="M11.692 11.692L28.308 28.308M28.308 11.692L11.692 28.308"
			/>
		</svg>
	);
});

IconWindowsClose.displayName = "IconWindowsClose";
