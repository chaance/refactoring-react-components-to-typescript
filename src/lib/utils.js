export function scope(name) {
	return name ? `ms--${name.replace(/^[-\s]+/g, "")}` : "";
}
