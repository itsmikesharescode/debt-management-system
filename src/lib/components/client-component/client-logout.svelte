<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '../general-component/loader.svelte';
	import { goto } from '$app/navigation';

	let logoutLoader = false;

	const logoutActionNews: SubmitFunction = () => {
		logoutLoader = true;
		return async ({ result, update }) => {
			const { status } = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					goto('/');
					logoutLoader = false;
					break;

				case 400:
					logoutLoader = false;
					break;

				case 401:
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
		class="flex w-full items-center justify-center rounded-[10px] bg-red py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-60 sm:text-[16px]"
	>
		<Loader name="Log out" loader={logoutLoader} loaderName="Exiting..." />
	</button>
</form>
