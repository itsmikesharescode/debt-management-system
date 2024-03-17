<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';

	export let arrowleftIcon: string;

	type InsertPurchaseVal = {
		[x: string]: string[] | undefined;
		[x: number]: string[] | undefined;
		[x: symbol]: string[] | undefined;
	};

	type InsertPurchaseAction = {
		msg: string;
		errors: InsertPurchaseVal;
	};

	let uploadLoader = false;
	let actionFormErrors: InsertPurchaseVal | null = null;

	const insertPurchaseActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<InsertPurchaseAction>;

			switch (status) {
				case 200:
					break;

				case 400:
					actionFormErrors = errors;
					break;

				case 401:
					break;
			}
			await update();
		};
	};

	let initialVal: { id: string }[] = [];
	let scrollValue: HTMLDivElement;

	const incrementHandler = async () => {
		initialVal = [...initialVal, { id: crypto.randomUUID() }];
		await tick();
		scrollValue.scrollTop = scrollValue.scrollHeight;
	};

	const deletePurchaseHandler = (increment: { id: string }, index: number) => {
		const value = initialVal.filter((item) => item !== increment);
		initialVal = value;
		actionFormErrors = null;
	};
</script>

<form
	method="post"
	action="?/insertPurchaseAction"
	enctype="multipart/form-data"
	use:enhance={insertPurchaseActionNews}
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

	<div class="h-[300px] overflow-y-auto scroll-smooth" bind:this={scrollValue}>
		{#each initialVal as increment, index (increment.id)}
			<div
				class="mx-[22px] mt-[16px] flex flex-col gap-[5px]"
				in:fade={{ duration: 200 }}
				animate:flip={{ duration: 400 }}
			>
				<label>
					<span class="text-[10px] font-semibold">Product Name {index + 1}</span>
					<input
						name={`productName${index + 1}`}
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[12px] text-[10px] outline-none"
					/>
					{#each actionFormErrors?.[`productName${index + 1}`] ?? [] as errorMsg}
						<p class="text-[12px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[10px] font-semibold">Product Price {index + 1}</span>
					<input
						name={`productPrice${index + 1}`}
						type="text"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[12px] text-[10px] outline-none"
					/>

					{#each actionFormErrors?.[`productPrice${index + 1}`] ?? [] as errorMsg}
						<p class="text-[12px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<div class="flex justify-end">
					<button
						class="h-[35px] w-[105px] rounded-[10px] bg-red text-[12px] font-semibold text-white"
						on:click={() => deletePurchaseHandler(increment, index)}>Delete</button
					>
				</div>
			</div>
		{/each}
	</div>

	<hr class=" w-full border-[1px] border-subWhite" />

	<div class="mx-[12px] mt-[14px] flex items-center justify-center gap-[10px]">
		<button
			type="button"
			class="h-[35px] w-full rounded-[10px] bg-black p-2 text-[12px] font-semibold text-white active:bg-opacity-80"
			on:click={incrementHandler}>Increment</button
		>

		<button
			class="h-[35px] w-full rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
			type="submit">Upload</button
		>
	</div>
</form>

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
