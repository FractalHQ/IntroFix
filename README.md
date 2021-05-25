# Svelte intro transition SSG fix

To see it in action:
- Visit https://intro-fix.vercel.app.
- Set network speed to `fast 3g` or lower.
- Refresh the page, and you should see the differences between the two intros.

## Problem

When an SSG'd page is served, any elements with intro animations appear with their `opacity` set to `1`.  When the page is hydrated, they quickly disappear before starting their intro transition.  Doesn't look good, especially for pages with elaborate intro animations.

## Potential solution:

- Set the `node.style.opacity` to whatever `opacity` is fed to the transition (default 0).
- Add an `introend` event listener to apply the `target_opacity` (the nodes initial opacity).

Right now my modified `fly` transition is in `src/pages/index.svelte`:

```js
function flyfix(node, { delay = 0, duration = 400, easing: easing$1 = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
+	node.style.opacity = opacity // set initial opacity
+	node.addEventListener('introend', () => { // set target opacity on introend
+		node.style.opacity = style.opacity
+	}, {once: true})
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing: easing$1,
		css: (t, u) => `
			transform: ${transform} translate3D(${(1 - t) * x}px, ${(.99 - t) * y}px, 0);
			opacity: ${target_opacity - (od * u)};
		`
	}
};
```
