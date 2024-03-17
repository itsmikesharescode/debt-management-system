<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '../general-component/loader.svelte';
	import type { ResultModel } from '$lib/types';
	import { goto } from '$app/navigation';

	let logoutLoader = false;

	const logoutActionNews: SubmitFunction = () => {
		logoutLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					logoutLoader = false;
					goto('/');

					break;

				case 401:
					alert(msg);
					logoutLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="?/logoutAction"
	enctype="multipart/form-data"
	use:enhance={logoutActionNews}
>
	<button
		disabled={logoutLoader}
		class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-red text-[12px] font-semibold text-white"
	>
		<Loader name="Logout" loader={logoutLoader} loaderName="Exitting..." />
	</button>
</form>
