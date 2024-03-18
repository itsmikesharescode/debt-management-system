<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';

	const logoutActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const { status } = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					break;

				case 400:
					break;

				case 401:
					break;

				case 403:
					break;

				case 404:
					break;

				case 409:
					break;

				default:
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
		class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-60"
		>Account</button
	>
</form>
