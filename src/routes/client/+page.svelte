<script lang="ts">
	import type { PageServerData } from './$types';
	import { setUser, getUser, formatDate } from '$lib';
	import ClientLogout from '$lib/components/client-component/client-logout.svelte';
	import ClientAccount from '$lib/components/client-component/client-account.svelte';
	import client_boy_icon from '$lib/assets/client_boy_icon.svg';
	import client_girl_icon from '$lib/assets/client_girl_icon.svg';
	import DropDown from '$lib/components/general-component/drop-down.svelte';
	import { fade } from 'svelte/transition';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();

	let clientRouteControls = {
		activeItem: 'Purchase History'
	};

	let buttonControls = ['Purchase History', 'Payment History'];

	const handleSelect = (selected: string) => {
		clientRouteControls.activeItem = selected;
	};
</script>

<div class=" px-[24px] pt-[29px] sm:px-[72px] sm:pt-[40px]">
	<div class="flex items-center gap-[5px]">
		<div class="w-[104px]">
			<ClientLogout />
		</div>
		<div class="w-[104px]">
			<ClientAccount />
		</div>
	</div>

	<div class="mt-[45px] flex items-center justify-between sm:mt-[49px]">
		<div class=" flex flex-col gap-[4px] text-[14px] sm:text-[16px]">
			<p>{$user?.user_metadata.fullName}</p>
			<p>{$user?.email}</p>
		</div>

		{#if $user?.user_metadata.gender === 'male'}
			<img src={client_boy_icon} alt="boy-icon" class="" />
		{:else}
			<img src={client_girl_icon} alt="girl-icon" class="" />
		{/if}
	</div>

	<hr class="mt-[9px] w-full border-[1px] border-subWhite sm:mt-[23px]" />

	<div class="mt-[21px] flex flex-col gap-[4px] text-[14px] sm:mt-[23px] sm:text-[16px]">
		<p>Balance: {data.amountObj?.data?.prev_amount ?? 0} Php</p>
		<p>Latest: {data.amountObj?.data?.latest_amount ?? 0} Php</p>
		<p>Total: {data.amountObj?.data?.total_amount ?? 0} Php</p>
	</div>

	<hr class="mt-[21px] w-full border-[1px] border-subWhite sm:mt-[23px]" />

	<div class="mt-[21px] flex items-center gap-[4px] sm:mt-[24px]">
		{#each buttonControls as buttonName}
			<button
				on:click={() => handleSelect(buttonName)}
				class="flex w-full items-center justify-center py-[8.5px] text-[14px] sm:max-w-[134px] sm:text-[16px]
				{clientRouteControls.activeItem === buttonName ? 'bg-black text-white' : 'bg-lowWhite text-black'} "
				>{buttonName}</button
			>
		{/each}
	</div>

	<div class="mt-[26px] sm:mt-[24px]">
		{#if clientRouteControls.activeItem === 'Purchase History'}
			<div
				class="flex flex-col gap-[10px] sm:mt-[28px] sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
				in:fade
			>
				{#each data.purchaseList ?? [] as purchase}
					<div class="">
						<DropDown dateHeader={formatDate(purchase.created_at)}>
							<div class="flex flex-col gap-[5px]">
								{#each Array(Object.keys(purchase.purchase_products_with_price).length / 2) as sample, index}
									<div class="flex text-left text-[10px]">
										{purchase.purchase_products_with_price[`productName${index + 1}`]}
										{purchase.purchase_products_with_price[`productPrice${index + 1}`]}
									</div>
								{/each}

								<p class="text-center">Total: {purchase.total_amount}</p>
							</div>
						</DropDown>
					</div>
				{/each}
			</div>
		{:else}
			<div
				class="flex flex-col gap-[10px] sm:mt-[28px] sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
				in:fade
			>
				{#each data.paymentHistoryList ?? [] as payment}
					<div class="">
						<DropDown dateHeader={payment.created_at}>
							<p>Payment Mode: {payment.payment_mode}</p>
							<p>Payment Amount: {payment.payment_amount}</p>
							{#each payment.purchase_history ?? [] as purchaseHistory}
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
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
