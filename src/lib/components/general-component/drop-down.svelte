<script lang="ts">
	import drop_down_icon from '$lib/assets/drop_down_icon.svg';

	let showContent = false;
	export let dateHeader = 'Nov 6 1996';
</script>

<button
	class="w-full bg-lowWhite px-[15px] text-[10px]"
	on:click={() => (showContent = !showContent)}
>
	<div class="pb-[12px] pt-[12px]">
		<div class="flex items-center justify-between">
			<div class="">
				<p>{dateHeader}</p>
			</div>

			<img
				src={drop_down_icon}
				alt="drop-down-icon"
				class="transition-all {showContent ? 'rotate-[180deg]' : ''}"
			/>
		</div>

		<div class="transition-all {showContent ? '' : 'hidden'}">
			<hr class="my-[10px] w-full border-[1px] border-subWhite" />

			<div class=" max-h-[180px] overflow-auto scroll-smooth">
				<slot />
			</div>
		</div>
	</div>
</button>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
