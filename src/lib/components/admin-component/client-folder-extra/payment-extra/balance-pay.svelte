<script lang="ts">
	import { scale } from 'svelte/transition';

	let showBalancePay = false;
	export let admin_arrowleft_icon: string;
</script>

<button
	type="button"
	class=" h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white active:bg-opacity-80"
	on:click={() => (showBalancePay = true)}>Balance Pay</button
>

{#if showBalancePay}
	<div class="fixed">
		<div class="mx-auto w-[255px] bg-white pb-[45px] pt-[10px] sm:w-[416px]">
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={() => (showBalancePay = false)}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[12px] font-semibold">Balance Payment</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mt-[20px] flex flex-col gap-[10px] px-[10px]">
				<input
					type="number"
					class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
					placeholder="Enter balance amount"
				/>

				<div class="flex items-center gap-[10px]">
					<button
						class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
						>Proceed</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
