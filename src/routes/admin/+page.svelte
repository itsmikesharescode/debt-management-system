<script lang="ts">
	import { setUser, getUser } from '$lib';
	import Logout from '$lib/components/admin-component/logout.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class="">
	<Logout />
</div>
