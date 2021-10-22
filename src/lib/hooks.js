import * as React from "react";

export function useConsoleLog(...args) {
	React.useEffect(() => {
		console.log(...args);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, args);
}
