<script lang="ts">
	import type { PageServerData } from './$types';
	import { setUser, getUser } from '$lib';
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
		<div class=" flex flex-col gap-[4px] text-[12px]">
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

	<div class="mt-[21px] flex flex-col gap-[4px] text-[12px] sm:mt-[23px]">
		<p>Balance: 2000 Php</p>
		<p>Latest: 2000 Php</p>
		<p>Total: 2000 Php</p>
	</div>

	<hr class="mt-[21px] w-full border-[1px] border-subWhite sm:mt-[23px]" />

	<div class="mt-[21px] flex items-center gap-[4px] sm:mt-[24px]">
		{#each buttonControls as buttonName}
			<button
				on:click={() => handleSelect(buttonName)}
				class="flex h-[22px] w-full items-center justify-center text-[12px] sm:max-w-[134px]
				{clientRouteControls.activeItem === buttonName ? 'bg-black text-white' : 'bg-lowWhite text-black'} "
				>{buttonName}</button
			>
		{/each}
	</div>

	<div class="mt-[26px] sm:mt-[24px]">
		{#if clientRouteControls.activeItem === 'Purchase History'}
			<div
				class="flex flex-col gap-[10px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[5px]"
				in:fade
			>
				{#each Array(20) as sampleArray}
					<div class="lg:w-[320px]">
						<DropDown>
							{#each Array(10) as sample}
								<p class="text-[10px]">Chicken - 120 Php</p>
							{/each}
						</DropDown>
					</div>
				{/each}
			</div>
		{:else}
			<div
				class="flex flex-col gap-[10px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[5px]"
				in:fade
			>
				{#each Array(20) as sampleArray}
					<div class="lg:w-[320px]">
						<DropDown>
							<p>Complete Pay</p>
							<div class="mt-[12px]">
								{#each Array(10) as sample}
									<DropDown>
										{#each Array(20) as sampleee}
											<p class="text-[10px]">Chicken - 120 Php</p>
										{/each}
									</DropDown>
								{/each}
							</div>
						</DropDown>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
