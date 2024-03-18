<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { scale } from 'svelte/transition';

	let showCompletePay = false;

	const completePayActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					break;

				case 400:
					break;

				case 401:
					break;
			}
			await update();
		};
	};
</script>

<button
	type="button"
	class=" h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white active:bg-opacity-80"
	on:click={() => (showCompletePay = true)}>Complete Pay</button
>

{#if showCompletePay}
	<form
		method="post"
		action="?/completePayAction"
		enctype="multipart/form-data"
		use:enhance={completePayActionNews}
		class="fixed p-2"
	>
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
						type="button"
						on:click={() => (showCompletePay = false)}
						class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
						>No</button
					>
					<button
						type="submit"
						class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
						>Yes</button
					>
				</div>
			</div>
		</div>
	</form>
{/if}
