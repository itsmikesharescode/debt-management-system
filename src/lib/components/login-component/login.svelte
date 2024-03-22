<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '../general-component/loader.svelte';
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import { fade } from 'svelte/transition';
	import type { User } from '@supabase/supabase-js';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	type LoginVal = {
		email: string[];
		password: string[];
	};

	type LoginAction = {
		user: User;
		msg: string;
		errors: LoginVal;
	};

	let actionFormErrors: LoginVal | null = null;
	let loginLoader = false;

	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		actionFormErrors = null;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors, user }
			} = result as ResultModel<LoginAction>;

			switch (status) {
				case 200:
					const {
						user_metadata: { role }
					} = user;
					toast.success('Login', { description: msg });
					loginLoader = false;
					if (role === 'admin') goto('/admin');
					else if (role === 'client') goto('/client');

					break;

				case 400:
					actionFormErrors = errors;
					loginLoader = false;
					break;

				case 401:
					toast.error('Login', { description: msg });
					actionFormErrors = null;
					loginLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="?/loginAction"
	enctype="multipart/form-data"
	use:enhance={loginActionNews}
	class="px-[23px] pt-[145px] xs:px-[70px] sm:mx-auto sm:w-[582px] lg:pt-[308px]"
>
	<div class="">
		<div class="">
			<p class="text-center text-[20px] font-semibold sm:text-[25px]">DEBT MANAGEMENT</p>
			<p class="text-center text-[12px] font-semibold text-subWhite">
				Log in to check your records
			</p>
		</div>

		<div class="mt-[24px] flex flex-col gap-[13px]">
			<label class="flex w-full flex-col gap-[6px]">
				<span class="text-[14px] font-semibold sm:text-[16px]">Email Address</span>
				<input
					name="email"
					type="email"
					class=" w-full rounded-[10px] border-[1px] border-black px-[14px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter your email address"
				/>

				{#each actionFormErrors?.email ?? [] as errorMsg}
					<p class="text-[14px] font-semibold text-red" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<label class="flex flex-col gap-[6px]">
				<span class="text-[14px] font-semibold sm:text-[16px]">Password</span>
				<input
					name="password"
					type="password"
					class=" w-full rounded-[10px] border-[1px] border-black px-[14px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					placeholder="Enter your email password"
				/>
				{#each actionFormErrors?.password ?? [] as errorMsg}
					<p class="text-[14px] font-semibold text-red" in:fade>{errorMsg}</p>
				{/each}
			</label>

			<button
				class="flex w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[8.5px] text-[14px] font-semibold text-white sm:text-[16px]"
			>
				<Loader name="Log in" loader={loginLoader} loaderName="Logging in..." />
			</button>
		</div>
	</div>
</form>
