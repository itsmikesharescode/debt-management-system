<script lang="ts">
	import Loader from '$lib/components/general-component/loader.svelte';
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

		<p>Purchase History</p>
		<p>Client Name here</p>
	</div>

	<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

	<div class="h-[300px] overflow-y-auto scroll-smooth"></div>

	<hr class=" w-full border-[1px] border-subWhite" />

	<div class="mx-[12px] mt-[14px] flex items-center justify-center gap-[10px]">
		<button
			type="button"
			class="h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white active:bg-opacity-80"
			>Balance Pay</button
		>

		<button
			class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
			type="submit"
		>
			Complete Pay
		</button>
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
	}

	/* Track */
	::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
