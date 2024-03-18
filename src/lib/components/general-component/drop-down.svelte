<script lang="ts">
	import drop_down_icon from '$lib/assets/drop_down_icon.svg';

	let showContent = false;
	export let dateHeader = 'Nov 6 1996';
</script>

<div class="w-full bg-lowWhite px-[15px] text-[10px]">
	<div class="pb-[12px] pt-[12px]">
		<button
			class="flex w-full items-center justify-between"
			on:click={() => (showContent = !showContent)}
		>
			<div class="">
				<p>{dateHeader}</p>
			</div>

			<img
				src={drop_down_icon}
				alt="drop-down-icon"
				class="transition-all {showContent ? 'rotate-[180deg]' : ''}"
			/>
		</button>

		<div class="transition-all {showContent ? '' : 'hidden'}">
			<hr class="my-[10px] w-full border-[1px] border-subWhite" />

			<div class=" max-h-[180px] overflow-auto scroll-smooth">
				<!--Dynamic data willl be rendered here-->
				<slot />
			</div>
		</div>
	</div>
</div>

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
