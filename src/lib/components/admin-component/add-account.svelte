<script lang="ts">
	import { enhance } from '$app/forms';
	import admin_add_account_icon from '$lib/assets/admin_add_account_icon.svg';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fade, scale } from 'svelte/transition';
	import Loader from '../general-component/loader.svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	export let showCreateAccountModal = false;

	type CreateAccountVal = {
		gender: string[];
		completeName: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	};

	type CreateAccountAction = {
		msg: string;
		errors: CreateAccountVal;
	};

	let actionFormErrors: CreateAccountVal | null = null;
	let createAccountLoader = false;

	const createAccountActionNews: SubmitFunction = () => {
		createAccountLoader = true;
		actionFormErrors = null;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<CreateAccountAction>;

			switch (status) {
				case 200:
					toast.success('Create Account', { description: msg });
					invalidateAll();
					createAccountLoader = false;
					break;

				case 400:
					actionFormErrors = errors;
					createAccountLoader = false;
					break;

				case 401:
					toast.error('Create Account', { description: msg });
					actionFormErrors = null;
					createAccountLoader = false;
					break;
			}
			await update();
		};
	};

	const cleanModal = () => {
		showCreateAccountModal = false;
		actionFormErrors = null;
	};
</script>

<button class="" on:click={() => (showCreateAccountModal = true)}>
	<img src={admin_add_account_icon} alt="add-account-icon" class="" />
</button>

{#if showCreateAccountModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="xs:px-[35px] fixed bottom-0 left-0 right-0 top-0 bg-overlay px-[23px]"
		on:click|self={cleanModal}
	>
		<form
			method="post"
			action="?/createAccountAction"
			enctype="multipart/form-data"
			use:enhance={createAccountActionNews}
			class=" mt-[101px] w-full bg-white pb-[50px] pt-[10px] sm:mx-auto sm:w-[416px]"
			in:scale
		>
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={cleanModal}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[20px] font-semibold">Create Account</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mx-[12px] mt-[20px] flex flex-col gap-[6px]">
				<div class="">
					<div class="flex items-center gap-[5px]">
						<label class="flex items-center gap-[4px]">
							<span class="text-[14px] sm:text-[16px]">Male</span>
							<input type="radio" class="" value="male" name="gender" />
						</label>

						<label class="flex items-center gap-[4px]">
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
					disabled={createAccountLoader}
					class="mt-[10px] flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] text-white sm:text-[16px]"
				>
					<Loader name="Create Account" loader={createAccountLoader} loaderName="Creating..." />
				</button>
			</div>
		</form>
	</div>
{/if}
