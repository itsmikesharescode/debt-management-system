<script lang="ts">
	import DropDown from '$lib/components/general-component/drop-down.svelte';
	import { scale } from 'svelte/transition';
	export let admin_arrowleft_icon: string;
</script>

<div
	class="mx-auto mt-[101px] min-h-[336px] w-[255px] bg-white pb-[45px] pt-[10px] sm:w-[416px]"
	in:scale
>
	<div
		class="relative flex flex-col items-center justify-center gap-[5px] text-[12px] font-semibold"
	>
		<div class="absolute left-0 top-0">
			<button class=" p-2" on:click
				><img src={admin_arrowleft_icon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Payment History</p>
		<p>Client Name here</p>
	</div>

	<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

	<div class="mx-[15px] mt-[14px] flex h-[300px] flex-col gap-[9px] overflow-y-auto scroll-smooth">
		{#each Array(20) as justSample}
			<DropDown>
				{#each Array(20) as sample}
					<DropDown>
						<p>Chicken - 120php</p>
					</DropDown>
				{/each}
			</DropDown>
		{/each}
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
