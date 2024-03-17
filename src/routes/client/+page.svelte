<script lang="ts">
	import type { PageServerData } from './$types';
	import { setUser, getUser } from '$lib';

	export let data: PageServerData;

	if (data.user) setUser(data.user);

	const user = getUser();
</script>

<div class="">{$user?.email}</div>
