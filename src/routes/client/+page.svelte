<script lang="ts">
	import type { PageServerData } from './$types';
	import { setUser, getUser } from '$lib';
	import ClientLogout from '$lib/components/client-component/client-logout.svelte';
	import ClientAccount from '$lib/components/client-component/client-account.svelte';
	import client_boy_icon from '$lib/assets/client_boy_icon.svg';
	import client_girl_icon from '$lib/assets/client_girl_icon.svg';
	import DropDown from '$lib/components/general-component/drop-down.svelte';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class=" px-[24px] pt-[29px]">
	<div class="flex items-center gap-[5px]">
		<div class="w-[104px]">
			<ClientLogout />
		</div>
		<div class="w-[104px]">
			<ClientAccount />
		</div>
	</div>

	<div class="mt-[45px] flex items-center justify-between">
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

	<hr class="mt-[9px] w-full border-[1px] border-subWhite" />

	<div class="mt-[21px] flex flex-col gap-[4px] text-[12px]">
		<p>Balance: 2000 Php</p>
		<p>Latest: 2000 Php</p>
		<p>Total: 2000 Php</p>
	</div>

	<hr class="mt-[21px] w-full border-[1px] border-subWhite" />

	<div class="mt-[21px] flex items-center gap-[4px]">
		<button class="flex h-[22px] w-full items-center justify-center bg-black text-[12px] text-white"
			>Purchase History</button
		>

		<button
			class="flex h-[22px] w-full items-center justify-center bg-lowWhite text-[12px] text-black"
			>Payment History</button
		>
	</div>

	<div class="mt-[26px] flex flex-col gap-[10px]">
		{#each Array(20) as sampleArray}
			<DropDown>
				{#each Array(10) as sample}
					<p class="text-[10px]">Chicken - 120 Php</p>
				{/each}
			</DropDown>
		{/each}
	</div>
</div>
