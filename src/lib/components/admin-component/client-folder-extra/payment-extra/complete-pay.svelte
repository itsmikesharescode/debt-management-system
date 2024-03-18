<script lang="ts">
	import { scale } from 'svelte/transition';

	let showCompletePay = false;
</script>

<button
	type="button"
	class=" h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white active:bg-opacity-80"
	on:click={() => (showCompletePay = true)}>Complete Pay</button
>

{#if showCompletePay}
	<div class="fixed">
		<div
			class="mx-auto w-[255px] border-t-[2px] border-subWhite bg-white pb-[45px] pt-[10px] sm:w-[416px]"
		>
			<div class="relative flex items-center justify-center">
				<p class="text-center text-[12px] font-semibold">Complete Payment</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mt-[20px] flex flex-col gap-[10px] px-[10px]">
				<div class="flex items-center gap-[10px]">
					<button
						on:click={() => (showCompletePay = false)}
						class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
						>No</button
					>
					<button
						class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
						>Yes</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
