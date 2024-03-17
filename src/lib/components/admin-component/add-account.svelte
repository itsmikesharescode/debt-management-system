<script lang="ts">
	import admin_add_account_icon from '$lib/assets/admin_add_account_icon.svg';
	import admin_arrowleft_icon from '$lib/assets/admin_arrowleft_icon.svg';
	import { scale } from 'svelte/transition';

	export let showCreateAccountModal = false;
</script>

<button class="" on:click={() => (showCreateAccountModal = true)}>
	<img src={admin_add_account_icon} alt="add-account-icon" class="" />
</button>

{#if showCreateAccountModal}
	<div class="bg-overlay fixed bottom-0 left-0 right-0 top-0">
		<form class="mx-auto mt-[101px] min-h-[383px] w-[255px] bg-white pb-[50px] pt-[10px]" in:scale>
			<div class="relative flex items-center justify-center">
				<div class="absolute left-0">
					<button class="flex items-center p-2" on:click={() => (showCreateAccountModal = false)}>
						<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
					</button>
				</div>
				<p class="text-center text-[12px] font-semibold">Create Account</p>
			</div>

			<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

			<div class="mx-[12px] mt-[20px] flex flex-col gap-[6px]">
				<label>
					<span class="text-[10px] font-semibold">Complete Name</span>
					<input
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter complete name"
					/>
				</label>

				<label>
					<span class="text-[10px] font-semibold">Email Address</span>
					<input
						type="email"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter email address"
					/>
				</label>

				<label>
					<span class="text-[10px] font-semibold">Password</span>
					<input
						type="password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Enter password"
					/>
				</label>

				<label>
					<span class="text-[10px] font-semibold">Confirm Password</span>
					<input
						type="password"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[15px] text-[10px] outline-none"
						placeholder="Confirm password"
					/>
				</label>

				<button
					class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white"
					>Create Account</button
				>
			</div>
		</form>
	</div>
{/if}
