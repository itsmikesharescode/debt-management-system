<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Loader from '$lib/components/general-component/loader.svelte';
	import type { ResultModel, UserListTB } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade, scale } from 'svelte/transition';

	export let admin_arrowleft_icon: string | undefined = undefined;
	export let client: UserListTB;

	type UpdateInformationVal = {
		gender: string[];
		completeName: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	};

	type UpdateInformationAction = {
		msg: string;
		errors: UpdateInformationVal;
	};

	let actionFormErrors: UpdateInformationVal | null = null;

	let updateInfoLoader = false;
	const updateInformationActionNews: SubmitFunction = () => {
		updateInfoLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UpdateInformationAction>;

			switch (status) {
				case 200:
					actionFormErrors = null;
					toast.success('Update Information', { description: msg });
					invalidateAll();
					updateInfoLoader = false;
					break;

				case 400:
					actionFormErrors = errors;
					updateInfoLoader = false;
					break;

				case 401:
					actionFormErrors = null;
					toast.error('Update Information Error', { description: msg });
					updateInfoLoader = false;
					break;
			}
			await update();
		};
	};

	// for account deletion

	let deleteAccountLoader = false;
	const deleteAccountActionNews: SubmitFunction = () => {
		deleteAccountLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Account Deletion', { description: msg });
					invalidateAll();

					deleteAccountLoader = false;
					break;

				case 401:
					toast.error('Account Deletion', { description: msg });
					deleteAccountLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay px-[23px] xs:px-[35px]">
	<form
		method="post"
		action="?/updateInformationAction"
		enctype="multipart/form-data"
		use:enhance={updateInformationActionNews}
		class="relative mt-[101px] min-h-[383px] w-full bg-white pb-[50px] pt-[10px] sm:mx-auto sm:w-[416px] md:w-[600px]"
		in:scale
	>
		<input name="userId" type="hidden" value={client.user_id} class="" />
		<div class="relative flex items-center justify-center">
			<div class="absolute left-0">
				<button class="flex items-center p-2" on:click>
					<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
				</button>
			</div>
			<div class="flex flex-col gap-[2px] text-[14px] font-semibold sm:text-[16px]">
				<p>Update Account</p>
				<p>{client.user_email}</p>
			</div>
		</div>

		<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

		<div class="absolute right-0 mr-2">
			<form
				method="post"
				action="?/deleteAccountAction"
				enctype="multipart/form-data"
				use:enhance={deleteAccountActionNews}
			>
				<input name="userId" type="hidden" value={client.user_id} />
				<button
					type="submit"
					class="mt-[10px] flex w-full items-center justify-center rounded-[10px] bg-red px-[10px] py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-50 sm:text-[16px]"
				>
					<Loader name="Delete Account" loader={deleteAccountLoader} loaderName="Wait..." />
				</button>
			</form>
		</div>

		<div class="mx-[12px] mt-[30px] flex flex-col gap-[6px]">
			<div class="">
				<div class="flex items-center gap-[5px]">
					<label class="flex items-center gap-[5px]">
						<span class="text-[14px] sm:text-[16px]">Male</span>
						<input type="radio" class="" value="male" name="gender" />
					</label>

					<label class="flex items-center gap-[5px]">
						<span class="text-[14px] sm:text-[16px]">Female</span>
						<input type="radio" class="" value="female" name="gender" />
					</label>
				</div>
				{#each actionFormErrors?.gender ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</div>

			<label>
				<span class="text-[14px] sm:text-[16px]">Complete Name</span>
				<input
					name="completeName"
					type="text"
					class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter complete name"
				/>
				{#each actionFormErrors?.completeName ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<label>
				<span class="text-[14px] sm:text-[16px]">Email Address</span>
				<input
					name="email"
					type="email"
					class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter email address"
				/>
				{#each actionFormErrors?.email ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<label>
				<span class="text-[14px] sm:text-[16px]">Password</span>
				<input
					name="password"
					type="password"
					class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter password"
				/>
				{#each actionFormErrors?.password ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<label>
				<span class="text-[14px] sm:text-[16px]">Confirm Password</span>
				<input
					name="confirmPassword"
					type="password"
					class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Confirm password"
				/>
				{#each actionFormErrors?.confirmPassword ?? [] as errorMsg}
					<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<button
				class="mt-[10px] flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
			>
				<Loader name="Update Account" loader={updateInfoLoader} loaderName="Updating..." />
			</button>
		</div>
	</form>
</div>
