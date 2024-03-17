<script lang="ts">
	import { setUser, getUser } from '$lib';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class="">{$user?.email}</div>
