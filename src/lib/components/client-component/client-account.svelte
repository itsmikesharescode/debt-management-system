<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import { fade, scale } from 'svelte/transition';
	import Loader from '../general-component/loader.svelte';
	import { toast } from 'svelte-sonner';

	type UpdateAccountVal = {
		newPass: string[];
		confirmNewPass: string[];
	};

	type UpdateAccountAction = {
		msg: string;
		errors: UpdateAccountVal;
	};

	let actionFormErrors: UpdateAccountVal | null = null;
	let updateAccountLoader = false;
	let successMsg = '';

	const updateAccountActionNews: SubmitFunction = () => {
		updateAccountLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UpdateAccountAction>;

			switch (status) {
				case 200:
					actionFormErrors = null;
					updateAccountLoader = false;
					showAccountModal = false;
					toast.success('Update Password', { description: msg });
					break;

				case 400:
					actionFormErrors = errors;
					updateAccountLoader = false;
					break;

				case 401:
					toast.error('Update Password', { description: msg });
					actionFormErrors = null;
					updateAccountLoader = false;
					break;
			}
			await update();
		};
	};

	let showAccountModal = false;
</script>

<button
	on:click={() => (showAccountModal = true)}
	class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-60 sm:text-[16px]"
	>Account</button
>

{#if showAccountModal}
	<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay px-[23px] xs:px-[35px]">
		<div
			class="relative mx-auto mt-[101px] min-h-[362px] bg-white p-2 sm:w-[416px] md:w-[600px]"
			in:scale
		>
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={() => (showAccountModal = false)}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[14px] font-semibold sm:text-[16px]">Account Settings</p>
			</div>

			<hr class="mt-[10px] w-full border-[1px] border-subWhite" />

			<div
				class="mt-[26px] flex items-center justify-center text-center text-[14px] sm:text-[16px]"
			>
				<p class=" w-[198px]">We recommend to change your password every week.</p>
			</div>

			<form
				method="post"
				action="?/updateAccountAction"
				enctype="multipart/form-data"
				use:enhance={updateAccountActionNews}
				class="mt-[30px] flex flex-col gap-[13px]"
			>
				<label>
					<span class="text-[14px] sm:text-[16px]">New Password</span>
					<input
						name="newPass"
						type="password"
						placeholder="Enter your new password"
						class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					/>
					{#each actionFormErrors?.newPass ?? [] as errorMsg}
						<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[14px] sm:text-[16px]">Confirm New Password</span>
					<input
						name="confirmNewPass"
						type="password"
						placeholder="Confirm your new password"
						class="w-full rounded-[10px] border-[1px] border-black px-[15px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					/>
					{#each actionFormErrors?.confirmNewPass ?? [] as errorMsg}
						<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<button
					disabled={updateAccountLoader}
					class="flex items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
				>
					<Loader name="Update Password" loader={updateAccountLoader} loaderName="Please wait..." />
				</button>
			</form>

			<p
				class="mt-[10px] text-center text-[12px] font-semibold text-green-500 {successMsg
					? 'flex'
					: 'hidden'}"
			>
				{successMsg}
			</p>
		</div>
	</div>
{/if}
