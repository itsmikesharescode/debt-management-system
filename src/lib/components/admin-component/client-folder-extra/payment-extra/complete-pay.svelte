<script lang="ts">
	import { enhance } from '$app/forms';
	import { clientAmounts, clientFolderControls, clientPurchaseList } from '$lib';
	import Loader from '$lib/components/general-component/loader.svelte';
	import type { ResultModel, UserListTB } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let client: UserListTB;

	let showCompletePay = false;

	let completePayLoader = false;

	const completePayActionNews: SubmitFunction = () => {
		completePayLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Payment Success', { description: msg });
					$clientAmounts = null;
					$clientPurchaseList = null;
					$clientFolderControls.showPurchaseHistory = false;
					break;

				case 401:
					toast.error('Payment Failed', { description: msg });
					completePayLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<button
	type="button"
	class=" w-full rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
	on:click={() => (showCompletePay = true)}>Complete Pay</button
>

{#if showCompletePay}
	<form
		method="post"
		action="?/completePayAction"
		enctype="multipart/form-data"
		use:enhance={completePayActionNews}
		class=""
	>
		<input name="userId" type="hidden" value={client.user_id} />
		<div class=" w-[416px] border-t-[2px] border-subWhite bg-white pb-[45px] pt-[10px]">
			<div class="relative flex items-center justify-center">
				<p class="text-center text-[12px] font-semibold">Complete Payment</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mt-[20px] flex flex-col gap-[10px] px-[10px]">
				<div class="flex items-center gap-[10px]">
					<button
						type="button"
						on:click={() => (showCompletePay = false)}
						class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
						>No</button
					>
					<button
						type="submit"
						class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
					>
						<Loader name="Yes" loader={completePayLoader} loaderName="Please wait..." />
					</button>
				</div>
			</div>
		</div>
	</form>
{/if}
