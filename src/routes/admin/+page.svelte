<script lang="ts">
	import { setUser, getUser } from '$lib';
	import Account from '$lib/components/admin-component/account.svelte';
	import AddAccount from '$lib/components/admin-component/add-account.svelte';
	import ClientFolder from '$lib/components/admin-component/client-folder.svelte';
	import Logout from '$lib/components/admin-component/logout.svelte';
	import Search from '$lib/components/admin-component/search.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class="mx-auto mt-[17px] w-[266px] sm:w-[532px] lg:w-[1349px]">
	<div class="flex items-center justify-between">
		<div class="flex gap-[5px]">
			<div class="w-[104px]">
				<Logout />
			</div>

			<div class="w-[104px]">
				<Account />
			</div>
		</div>

		<div class="">
			<AddAccount />
		</div>
	</div>

	<div class="mt-[33px] flex items-center justify-between">
		<div class=" flex flex-col gap-[4px] text-[12px]">
			<p>{$user?.user_metadata.fullName}</p>
			<p>{$user?.email}</p>
		</div>

		<div class="hidden sm:flex">
			<Search />
		</div>
	</div>

	<hr class=" mt-[12px] w-full border-[1px] border-subWhite sm:mt-[23px]" />

	<div class="my-[16px] sm:hidden">
		<Search />
	</div>

	<div class="flex flex-col gap-[10px] sm:mt-[28px] sm:flex-row sm:flex-wrap sm:gap-[12px]">
		{#each ['', '', '', '', '', '', '', ''] as sample}
			<div class="sm:w-[260px]">
				<ClientFolder />
			</div>
		{/each}
	</div>
</div>
