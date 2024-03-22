<script lang="ts">
	import { clientPaymentList, formatDate } from '$lib';
	import DropDown from '$lib/components/general-component/drop-down.svelte';
	import type { UserListTB } from '$lib/types';
	import { scale } from 'svelte/transition';
	export let admin_arrowleft_icon: string;
	export let client: UserListTB;
</script>

<div
	class="mx-auto mt-[101px] w-full bg-white pb-[45px] pt-[10px] sm:w-[416px] md:w-[600px]"
	in:scale
>
	<div
		class="relative flex flex-col items-center justify-center gap-[5px] text-[14px] sm:text-[16px]"
	>
		<div class="absolute left-0 top-0">
			<button class=" p-2" on:click
				><img src={admin_arrowleft_icon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Payment History</p>
		<p>{client.user_fullname}</p>
	</div>

	<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

	<div
		class="mx-[15px] mt-[14px] flex h-[300px] flex-col gap-[9px] overflow-y-auto scroll-smooth md:h-[600px]"
	>
		{#each $clientPaymentList ?? [] as clientPayment}
			<DropDown dateHeader={formatDate(clientPayment.created_at)}>
				<p>Payment Mode: {clientPayment.payment_mode}</p>
				<p>Payment Amount: {clientPayment.payment_amount}</p>
				{#each clientPayment.purchase_history ?? [] as purchaseHistory}
					<DropDown dateHeader={formatDate(purchaseHistory.date)}>
						<div class="flex flex-col gap-[5px]">
							{#each Array(Number(purchaseHistory.payment_length)) as sample, index}
								<p>
									{purchaseHistory[`productName${index + 1}`]} - {purchaseHistory[
										`productPrice${index + 1}`
									]} php
								</p>
							{/each}

							<p class="mt-[10px] text-center">Total: {purchaseHistory.total_amount}</p>
						</div>
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
