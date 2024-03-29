<script lang="ts">
	import admin_folder_icon from '$lib/assets/admin_folder_icon.svg';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import { scale } from 'svelte/transition';
	import InsertPurchase from './client-folder-extra/insert-purchase.svelte';
	import PurchaseHistory from './client-folder-extra/purchase-history.svelte';
	import PaymentHistory from './client-folder-extra/payment-history.svelte';
	import type {
		NetAmountTB,
		PaymentHistoryTB,
		PurchaseListTB,
		ResultModel,
		UserListTB
	} from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '../general-component/loader.svelte';
	import { clientAmounts, clientPurchaseList, clientFolderControls, clientPaymentList } from '$lib';
	import { toast } from 'svelte-sonner';
	import UpdateInformation from './client-folder-extra/update-information.svelte';

	export let client: UserListTB;

	let showClientFolder = false;

	type PurchaseHistoryAction = {
		msg: string;
		purchaseList: PurchaseListTB[];
		amounts: NetAmountTB;
	};

	let clientMsg: string;
	let purchaseHistoryLoader = false;

	const purchaseHistoryActionNews: SubmitFunction = () => {
		purchaseHistoryLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, purchaseList, amounts }
			} = result as ResultModel<PurchaseHistoryAction>;

			switch (status) {
				case 200:
					$clientAmounts = amounts;
					$clientPurchaseList = purchaseList;
					purchaseHistoryLoader = false;
					$clientFolderControls.showPurchaseHistory = true;
					break;
				case 401:
					toast.error('Purchase History', { description: 'No records' });
					purchaseHistoryLoader = false;
					break;
			}
			await update();
		};
	};

	type PaymentHistoryAction = {
		msg: string;
		paymentList: PaymentHistoryTB[];
	};

	let paymentHistoryloader = false;

	const paymentHistoryActionNews: SubmitFunction = () => {
		paymentHistoryloader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, paymentList }
			} = result as ResultModel<PaymentHistoryAction>;

			switch (status) {
				case 200:
					$clientPaymentList = paymentList;
					$clientFolderControls.showPaymentHistory = true;
					paymentHistoryloader = false;
					break;

				case 401:
					toast.error('Payment History', { description: msg });
					paymentHistoryloader = false;
					break;
			}
			await update();
		};
	};
</script>

<button
	class="flex w-full items-center justify-between bg-lowWhite p-2 px-[20px] py-[8.5px] text-[14px] sm:text-[16px]"
	on:click={() => (showClientFolder = true)}
>
	{client.user_fullname}
	<img src={admin_folder_icon} alt="folder-icon" class="" />
</button>

{#if showClientFolder}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay px-[23px] xs:px-[35px]">
		<div class="" in:scale>
			{#if $clientFolderControls.showInsertPurchase}
				<InsertPurchase
					{client}
					{admin_arrowleft_icon}
					on:click={() => ($clientFolderControls.showInsertPurchase = false)}
				/>
			{:else if $clientFolderControls.showPurchaseHistory}
				<PurchaseHistory
					{client}
					{admin_arrowleft_icon}
					on:click={() => ($clientFolderControls.showPurchaseHistory = false)}
				/>
			{:else if $clientFolderControls.showPaymentHistory}
				<PaymentHistory
					{client}
					{admin_arrowleft_icon}
					on:click={() => ($clientFolderControls.showPaymentHistory = false)}
				/>
			{:else if $clientFolderControls.showUpdateInformation}
				<UpdateInformation
					{client}
					{admin_arrowleft_icon}
					on:click={() => ($clientFolderControls.showUpdateInformation = false)}
				/>
			{:else}
				<div class=" mt-[101px] bg-white pb-[45px] pt-[10px] sm:mx-auto sm:w-[416px]" in:scale>
					<div class="relative flex justify-center">
						<div class="absolute left-0">
							<button class="flex items-center p-2" on:click={() => (showClientFolder = false)}>
								<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
							</button>
						</div>
						<div class="">
							<p class="text-center text-[14px] font-semibold sm:text-[16px]">
								{client.user_fullname}
							</p>
							<p class="text-center text-[14px] font-semibold sm:text-[16px]">
								{client.user_email}
							</p>
						</div>
					</div>

					<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

					<div class="my-[39px]">
						<p class="text-center text-[14px] sm:text-[16px]">Choose your actions</p>
					</div>

					<div class="mx-[12.5px] flex flex-col gap-[7px] xs:mx-[93px]">
						<button
							class="w-full rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
							on:click={() => ($clientFolderControls.showInsertPurchase = true)}
							>Insert Purchase</button
						>

						<!--Form action to get purchase history-->
						<form
							method="post"
							action="?/purchaseHistoryAction"
							enctype="multipart/form-data"
							use:enhance={purchaseHistoryActionNews}
						>
							<input name="userId" type="hidden" value={client.user_id} class="" />
							<button
								disabled={purchaseHistoryLoader}
								type="submit"
								class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
							>
								<Loader
									name="Purchase History"
									loader={purchaseHistoryLoader}
									loaderName="Please wait..."
								/>
							</button>
						</form>

						<!-- Form action to get payment history-->
						<form
							method="post"
							action="?/paymentHistoryAction"
							enctype="multipart/form-data"
							use:enhance={paymentHistoryActionNews}
						>
							<input name="userId" type="hidden" value={client.user_id} />
							<button
								disabled={paymentHistoryloader}
								type="submit"
								class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
							>
								<Loader
									name="Payment History"
									loader={paymentHistoryloader}
									loaderName="Please wait..."
								/>
							</button>
						</form>

						<button
							on:click={() => ($clientFolderControls.showUpdateInformation = true)}
							class="w-full rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
							>Update Information</button
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
