<script lang="ts">
	import type { NetAmountTB, ResultModel, UserListTB } from '$lib/types';
	import { clientAmounts, clientFolderControls, clientPurchaseList, paymentControls } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import Loader from '$lib/components/general-component/loader.svelte';
	import { fade } from 'svelte/transition';

	export let client: UserListTB;

	//for complete pay
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

	//for balance pay
	type BalancePayVal = {
		balanceAmount: string[];
	};

	type BalancePayAction = {
		msg: string;
		amounts: NetAmountTB[];
		errors: BalancePayVal;
	};

	let actionFormErrors: BalancePayVal | null = null;
	let balancePayLoader = false;

	const balancePayActionNews: SubmitFunction = () => {
		balancePayLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, amounts, errors }
			} = result as ResultModel<BalancePayAction>;

			switch (status) {
				case 200:
					$clientAmounts = amounts[0];
					$clientPurchaseList = null;
					actionFormErrors = null;
					balancePayLoader = false;

					toast.success('Payment Made', { description: msg });
					break;

				case 400:
					actionFormErrors = errors;
					balancePayLoader = false;
					break;

				case 401:
					actionFormErrors = null;
					balancePayLoader = false;
					toast.error('Payment Error', { description: msg });
					break;
			}
			await update();
		};
	};
</script>

<div class="mt-[20px] px-[12px]">
	{#if $paymentControls.showCompletePay}
		<div class="flex flex-col gap-[5px]">
			<p class=" text-center text-[14px] sm:text-[16px]">You are about to complete pay.</p>
			<p class=" text-center text-[14px] sm:text-[16px]">Proceed?</p>
			<div class="flex items-center gap-[5px]">
				<button
					on:click={() => ($paymentControls.showCompletePay = false)}
					class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
					>No</button
				>

				<form
					method="post"
					action="?/completePayAction"
					enctype="multipart/form-data"
					use:enhance={completePayActionNews}
					class="w-full"
				>
					<input name="userId" type="hidden" value={client.user_id} />
					<button
						class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
					>
						<Loader name="Yes" loader={completePayLoader} loaderName="Wait..." />
					</button>
				</form>
			</div>
		</div>
	{/if}

	{#if $paymentControls.showBalancePay}
		<form
			method="post"
			action="?/balancePayAction"
			enctype="multipart/form-data"
			use:enhance={balancePayActionNews}
		>
			<label>
				<span class="text-[14px] sm:text-[16px]">Balance Amount</span>
				<input
					name="balanceAmount"
					type="number"
					class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter balance amount"
				/>
				{#each actionFormErrors?.balanceAmount ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<div class="mt-[10px] flex items-center gap-[5px]">
				<button
					type="button"
					on:click={() => ($paymentControls.showBalancePay = false)}
					class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
					>Cancel</button
				>

				<button
					class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
					>Proceed</button
				>
			</div>
		</form>
	{/if}

	{#if !($paymentControls.showCompletePay || $paymentControls.showBalancePay)}
		<div class="mt-[10px] flex items-center gap-[5px]">
			<button
				on:click={() => ($paymentControls.showBalancePay = true)}
				class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
				>Balance Pay</button
			>

			<button
				on:click={() => ($paymentControls.showCompletePay = true)}
				class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
				>Complete Pay</button
			>
		</div>
	{/if}
</div>
