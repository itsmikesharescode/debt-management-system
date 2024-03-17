<script lang="ts">
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';

	export let arrowleftIcon: string;

	let initialVal: { id: string }[] = [];
	let scrollValue: HTMLDivElement;

	const incrementHandler = async () => {
		initialVal = [...initialVal, { id: crypto.randomUUID() }];
		await tick();
		scrollValue.scrollTop = scrollValue.scrollHeight;
	};

	const deletePurchaseHandler = (increment: { id: string }) => {
		const value = initialVal.filter((item) => item !== increment);
		initialVal = value;
	};
</script>

<div
	class="mx-auto mt-[101px] min-h-[514px] w-[255px] bg-white pb-[45px] pt-[10px] sm:w-[416px]"
	in:scale
>
	<div
		class="relative flex flex-col items-center justify-center gap-[5px] text-[12px] font-semibold"
	>
		<div class="absolute left-0 top-0">
			<button class=" p-2" on:click
				><img src={arrowleftIcon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Insert Purchase</p>
		<p>Client Name here</p>
	</div>

	<div class="mx-[16px] mt-[19px] text-[12px] font-semibold">
		<p>Total: 1000 Php</p>
	</div>
	<hr class="mt-[19px] w-full border-[1px] border-subWhite" />

	<div class="h-[300px] overflow-y-auto" bind:this={scrollValue}>
		{#each initialVal as increment}
			<div class="mx-[22px] mt-[16px] flex flex-col gap-[5px]">
				<label>
					<span class="text-[10px] font-semibold">Product Name 1</span>
					<input
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[12px] text-[10px] outline-none"
					/>
				</label>

				<label>
					<span class="text-[10px] font-semibold">Product Price 1</span>
					<input
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[12px] text-[10px] outline-none"
					/>
				</label>

				<div class="flex justify-end">
					<button
						class="h-[35px] w-[105px] rounded-[10px] bg-red text-[12px] font-semibold text-white"
						on:click={() => deletePurchaseHandler(increment)}>Delete</button
					>
				</div>
			</div>
		{/each}
	</div>

	<hr class=" w-full border-[1px] border-subWhite" />

	<div class="mx-[12px] mt-[14px] flex items-center justify-center gap-[10px]">
		<button
			class="h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white"
			on:click={incrementHandler}>Increment</button
		>

		<button class="h-[35px] w-full rounded-[10px] bg-black text-[12px] font-semibold text-white"
			>Upload</button
		>
	</div>
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: black;
	}

	/* Track */
	::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
