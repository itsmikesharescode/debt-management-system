<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '../general-component/loader.svelte';
	import type { ResultModel } from '$lib/types';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

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
					toast.success('Logout', { description: msg });
					logoutLoader = false;
					goto('/');

					break;

				case 401:
					toast.error('Logout', { description: msg });
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
		class="flex w-full items-center justify-center rounded-[10px] bg-red py-[8.5px] text-[14px] font-semibold text-white sm:text-[16px]"
	>
		<Loader name="Logout" loader={logoutLoader} loaderName="Wait..." color="border-b-red" />
	</button>
</form>
