<script lang="ts">
	import { enhance } from '$app/forms';
	import admin_add_account_icon from '$lib/assets/admin_add_account_icon.svg';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fade, scale } from 'svelte/transition';
	import Loader from '../general-component/loader.svelte';
	import { invalidateAll } from '$app/navigation';

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
	let succeeded = '';
	let failed = '';

	const createAccountActionNews: SubmitFunction = () => {
		createAccountLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<CreateAccountAction>;

			switch (status) {
				case 200:
					failed = '';
					succeeded = msg;
					invalidateAll();
					createAccountLoader = false;
					break;

				case 400:
					failed = '';
					succeeded = '';
					actionFormErrors = errors;
					createAccountLoader = false;
					break;

				case 401:
					succeeded = '';
					failed = msg;
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
		succeeded = '';
		failed = '';
	};
</script>

<button class="" on:click={() => (showCreateAccountModal = true)}>
	<img src={admin_add_account_icon} alt="add-account-icon" class="" />
</button>

{#if showCreateAccountModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay" on:click|self={cleanModal}>
		<form
			method="post"
			action="?/createAccountAction"
			enctype="multipart/form-data"
			use:enhance={createAccountActionNews}
			class="mx-auto mt-[101px] min-h-[383px] w-[255px] bg-white pb-[50px] pt-[10px] sm:w-[416px]"
			in:scale
		>
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={cleanModal}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[12px] font-semibold">Create Account</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mx-[12px] mt-[20px] flex flex-col gap-[6px]">
				<p class="text-center text-[12px] font-semibold text-green-500">{succeeded}</p>
				<p class="text-center text-[12px] font-semibold text-red">{failed}</p>
				<div class="">
					<div class="flex items-center gap-[5px]">
						<label class="flex items-center gap-[1px]">
							<span class="text-[10px] font-semibold">Male</span>
							<input type="radio" class="" value="male" name="gender" />
						</label>

						<label class="flex items-center gap-[1px]">
							<span class="text-[10px] font-semibold">Female</span>
							<input type="radio" class="" value="female" name="gender" />
						</label>
					</div>
					{#each actionFormErrors?.gender ?? [] as errorMsg}
						<p class="text-[10px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</div>

				<label>
					<span class="text-[10px] font-semibold">Complete Name</span>
					<input
						name="completeName"
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter complete name"
					/>
					{#each actionFormErrors?.completeName ?? [] as errorMsg}
						<p class="text-[10px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[10px] font-semibold">Email Address</span>
					<input
						name="email"
						type="email"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter email address"
					/>
					{#each actionFormErrors?.email ?? [] as errorMsg}
						<p class="text-[10px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[10px] font-semibold">Password</span>
					<input
						name="password"
						type="password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter password"
					/>
					{#each actionFormErrors?.password ?? [] as errorMsg}
						<p class="text-[10px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[10px] font-semibold">Confirm Password</span>
					<input
						name="confirmPassword"
						type="password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Confirm password"
					/>
					{#each actionFormErrors?.confirmPassword ?? [] as errorMsg}
						<p class="text-[10px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<button
					disabled={createAccountLoader}
					class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white"
				>
					<Loader name="Create Account" loader={createAccountLoader} loaderName="Creating..." />
				</button>
			</div>
		</form>
	</div>
{/if}
