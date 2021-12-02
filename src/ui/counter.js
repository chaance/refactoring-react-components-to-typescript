import * as React from "react";

class Counter extends React.Component {
	state = {
		count: this.props.initialCount ?? 0,
	};

	constructor(props) {
		super(props);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	increment() {
		this.setState(({ count: prevCount }) => ({
			count: prevCount + 1,
		}));
	}

	decrement() {
		this.setState(({ count: prevCount }) => ({
			count: prevCount - 1,
		}));
	}

	render() {
		return (
			<div className={this.props.className}>
				<button type="button" onClick={this.decrement} aria-label="Decrement">
					-
				</button>
				<span>{this.state.count}</span>
				<button type="button" onClick={this.increment} aria-label="Increment">
					+
				</button>
			</div>
		);
	}
}

export { Counter };

function shallowCompare(instance, nextProps, nextState) {
	return (
		!shallowEqual(instance.props, nextProps) ||
		!shallowEqual(instance.state, nextState)
	);
}

let hasOwnProperty = Object.prototype.hasOwnProperty;

function shallowEqual(objA, objB) {
	if (is(objA, objB)) {
		return true;
	}

	if (
		typeof objA !== "object" ||
		objA === null ||
		typeof objB !== "object" ||
		objB === null
	) {
		return false;
	}

	let keysA = Object.keys(objA);
	let keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	for (let i = 0; i < keysA.length; i++) {
		if (
			!hasOwnProperty.call(objB, keysA[i]) ||
			!is(objA[keysA[i]], objB[keysA[i]])
		) {
			return false;
		}
	}

	return true;
}

function is(x, y) {
	if (x === y) {
		return x !== 0 || y !== 0 || 1 / x === 1 / y;
	}
	// eslint-disable-next-line no-self-compare
	return x !== x && y !== y;
}
