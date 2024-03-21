<script lang="ts">
	import { enhance } from '$app/forms';
	import Loader from '$lib/components/general-component/loader.svelte';
	import type { UserListTB } from '$lib/types';
	import { fade, scale } from 'svelte/transition';

	export let admin_arrowleft_icon: string | undefined = undefined;
	export let client: UserListTB;

	let actionFormErrors: any = null;
</script>

<div class="fixed bottom-0 left-0 right-0 top-0 bg-overlay">
	<form
		method="post"
		action="?/updateInformationAction"
		enctype="multipart/form-data"
		use:enhance
		class="mx-auto mt-[101px] min-h-[383px] w-[255px] bg-white pb-[50px] pt-[10px] sm:w-[416px]"
		in:scale
	>
		<div class="relative flex items-center justify-center">
			<div class="absolute left-0">
				<button class="flex items-center p-2" on:click>
					<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
				</button>
			</div>
			<div class="flex flex-col gap-[2px]">
				<p class="text-center text-[12px] font-semibold">Update Account</p>
				<p class="text-center text-[12px] font-semibold">{client.user_email}</p>
			</div>
		</div>

		<hr class="mt-[11px] w-full border-[1px] border-subWhite" />

		<div class="mx-[12px] mt-[20px] flex flex-col gap-[6px]">
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
				class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white"
			>
				<Loader name="Create Account" loaderName="Creating..." />
			</button>
		</div>
	</form>
</div>
