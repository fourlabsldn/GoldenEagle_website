
	// Returns int that is min <= val <= max
export function constrain(val, min, max) {
  const diff = max - min + 1; // plus one so that val is <=max and not <max
  const v = val - min;
  return min + (diff + (v % diff)) % diff;
}

export function toSelector(className) {
  return `.${className}`;
}
