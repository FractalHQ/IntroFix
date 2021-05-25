<script>
	import { cubicOut } from 'svelte/easing'
    import { fly } from 'svelte/transition'
	
	function flyfix(node, { delay = 0, duration = 400, easing: easing$1 = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    	const style = getComputedStyle(node);
    	const target_opacity = +style.opacity;
    	const transform = style.transform === 'none' ? '' : style.transform;
		node.style.opacity = opacity
		node.addEventListener('introend', () => {
			node.style.opacity = style.opacity
		}, {once: true})
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
</script>

<section>
    {#each ['T', 'E', 'S', 'T'] as letter, i}
        <h1>
            <div transition:fly={{ y: i % 2 === 1 ? -100 : 100, duration: 1500, delay: i * 50 }}>{letter}</div>
        </h1>
    {/each}
</section>

<section>
	{#each ['T', 'E', 'S', 'T'] as letter, i}
		<h1><div transition:flyfix={{ y: i % 2 === 1 ? -100 : 100, duration: 1500, delay: i * 50 }}>{letter}</div></h1>
	{/each}
</section>


<style>
	section {
		position: relative;
		width: max-content;
		height: 400px;
		display: flex;
		justify-content: space-around;
		margin: auto;
	}
	h1 {
		position: relative;
		width: 19rem;
	}
	div {
		width: 5rem;
		position: absolute;
		font-size: 40rem;
		margin: .1em auto;
	}
</style>