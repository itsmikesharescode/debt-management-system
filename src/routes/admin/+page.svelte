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

<div class="xs:px-[35px] px-[23px] pt-[17px] lg:mx-auto lg:w-[1349px]">
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
		<div class=" flex flex-col gap-[4px] text-[16px]">
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

	<div class="flex flex-col gap-[10px] sm:mt-[28px] sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
		{#each data?.clientList ?? [] as client}
			<div class="">
				<ClientFolder {client} />
			</div>
		{/each}
	</div>
</div>
