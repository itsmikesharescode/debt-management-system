<script lang="ts">
	import DropDown from '$lib/components/general-component/drop-down.svelte';
	import { scale } from 'svelte/transition';
	import BalancePay from './payment-extra/balance-pay.svelte';
	import CompletePay from './payment-extra/complete-pay.svelte';
	import type { NetAmountTB, PurchaseListTB, UserListTB } from '$lib/types';
	import { formatDate } from '$lib';
	import { clientAmounts, clientPurchaseList } from '$lib';
	import Payments from './payment-extra/payments.svelte';

	export let admin_arrowleft_icon: string;
	export let client: UserListTB;
</script>

<div class="mx-auto mt-[101px] min-h-[336px] bg-white pb-[45px] pt-[10px] sm:w-[416px]" in:scale>
	<div
		class="flex flex-col items-center justify-center gap-[5px] text-[14px] font-semibold sm:text-[16px]"
	>
		<div class="absolute left-0 top-0">
			<button class=" p-2" on:click
				><img src={admin_arrowleft_icon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Purchase History</p>
		<p>{client.user_fullname}</p>
	</div>

	<div class="mx-[15px] mt-[14px] text-[14px] sm:text-[16px]">
		<p>Previous: {$clientAmounts?.prev_amount} Php</p>
		<p>Latest: {$clientAmounts?.latest_amount} Php</p>
		<p>Total: {$clientAmounts?.total_amount} Php</p>
	</div>

	<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

	<div class="mx-[15px] mt-[14px] flex h-[300px] flex-col gap-[9px] overflow-y-auto scroll-smooth">
		{#each $clientPurchaseList ?? [] as purchase}
			<DropDown dateHeader={formatDate(purchase.created_at)}>
				<div class="flex flex-col gap-[5px]">
					{#each Array(Object.keys(purchase.purchase_products_with_price).length / 2) as sample, index}
						<div class="flex text-left text-[14px] sm:text-[16px]">
							{purchase.purchase_products_with_price[`productName${index + 1}`]}
							{purchase.purchase_products_with_price[`productPrice${index + 1}`]}
						</div>
					{/each}

					<p class="text-center">Total: {purchase.total_amount}</p>
				</div>
			</DropDown>
		{/each}
	</div>

	<hr class=" w-full border-[1px] border-subWhite" />

	<Payments {client} />
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
