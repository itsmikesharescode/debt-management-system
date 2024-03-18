<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import { scale } from 'svelte/transition';

	const updateAccountActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const { status } = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					break;

				case 400:
					break;

				case 401:
					break;
			}
			await update();
		};
	};

	let showAccountModal = false;
</script>

<button
	on:click={() => (showAccountModal = true)}
	class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-60"
	>Account</button
>

{#if showAccountModal}
	<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay">
		<div class="relative mx-auto mt-[101px] min-h-[362px] w-[255px] bg-white p-2" in:scale>
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={() => (showAccountModal = false)}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[12px] font-semibold">Account Settings</p>
			</div>

			<hr class="mt-[10px] w-full border-[1px] border-subWhite" />

			<div class="mt-[26px] flex items-center justify-center text-center text-[10px] font-semibold">
				<p class=" w-[198px]">We recommend to change your password every week.</p>
			</div>

			<form class="mt-[30px] flex flex-col gap-[13px]">
				<label>
					<span class="text-[10px] font-semibold">New Password</span>
					<input
						type="password"
						placeholder="Enter your new password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
					/>
				</label>

				<label>
					<span class="text-[10px] font-semibold">Confirm New Password</span>
					<input
						type="password"
						placeholder="Confirm your new password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
					/>
				</label>

				<button
					class="flex h-[35px] items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
					>Update Password</button
				>
			</form>
		</div>
	</div>
{/if}
