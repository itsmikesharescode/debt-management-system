<script lang="ts">
	import Loader from '../general-component/loader.svelte';
</script>

<div class="absolute left-0 right-0 top-0 mt-[97px] sm:mt-[251px] lg:mt-[271px]">
	<p class=" text-center text-[12px] font-semibold text-[#FB0000]">Invalid Email or Password</p>
</div>

<div class="mx-auto mt-[145px] w-[275px] sm:mt-[303px] sm:w-[455px] lg:mt-[308px]">
	<div class="">
		<p class="text-center text-[20px] font-semibold sm:text-[25px]">DEPT MANAGEMENT</p>
		<p class="text-center text-[12px] font-semibold text-[#878787]">Log in to check your records</p>
	</div>

	<div class="mt-[24px] flex flex-col gap-[13px]">
		<label class="flex w-full flex-col gap-[6px]">
			<span class="text-[12px] font-semibold">Email Address</span>
			<input
				type="email"
				class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[14px] py-[11.5px] text-[12px] outline-none"
				placeholder="Enter your email address"
			/>
		</label>

		<label class="flex flex-col gap-[6px]">
			<span class="text-[12px] font-semibold">Password</span>
			<input
				type="password"
				class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[14px] py-[11.5px] text-[12px] outline-none"
				placeholder="Enter your email password"
			/>
		</label>

		<button
			class="flex h-[35px] w-full items-center justify-center rounded-[10px] border-[1px] border-black bg-black py-[11.5px] text-[12px] font-semibold text-white"
		>
			<Loader name="Log in" loader={false} loaderName="Logging in..." />
		</button>
	</div>
</div>
