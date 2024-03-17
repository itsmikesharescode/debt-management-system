<script lang="ts">
	import { setUser, getUser } from '$lib';
	import Account from '$lib/components/admin-component/account.svelte';
	import Logout from '$lib/components/admin-component/logout.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class="flex gap-[5px]">
	<div class="w-[104px]">
		<Logout />
	</div>

	<div class="w-[104px]">
		<Account />
	</div>
</div>
