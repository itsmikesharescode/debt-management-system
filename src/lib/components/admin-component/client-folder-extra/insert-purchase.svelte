<script lang="ts">
	import { enhance } from '$app/forms';
	import Loader from '$lib/components/general-component/loader.svelte';
	import type { ResultModel, UserListTB } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';

	export let admin_arrowleft_icon: string;
	export let client: UserListTB;

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
		uploadLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<InsertPurchaseAction>;

			switch (status) {
				case 200:
					uploadLoader = false;
					break;

				case 400:
					actionFormErrors = errors;
					uploadLoader = false;
					break;

				case 401:
					uploadLoader = false;
					break;
			}
			await update();
		};
	};

	let initialVal: { id: string }[] = [{ id: crypto.randomUUID() }];
	let scrollValue: HTMLDivElement;

	const incrementHandler = async () => {
		initialVal = [...initialVal, { id: crypto.randomUUID() }];
		await tick();
		scrollValue.scrollTop = scrollValue.scrollHeight;
	};

	const deletePurchaseHandler = (increment: { id: string }, index: number) => {
		const { value } = document.querySelector(`#productPrice${index + 1}`) as HTMLInputElement;
		const filteredItems = initialVal.filter((item) => item !== increment);
		initialVal = filteredItems;
		actionFormErrors = null;
		totalAmount -= Number(value);
	};

	let totalAmount = 0;
	let tempMemo = 0;

	const detectValue = (e: EventTarget | null) => {
		const { value } = e as HTMLInputElement;
		totalAmount += Number(value);

		if (tempMemo) {
			totalAmount -= tempMemo;
		}
	};

	const setValue = (e: EventTarget | null) => {
		const { value } = e as HTMLInputElement;
		tempMemo = Number(value);
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
				><img src={admin_arrowleft_icon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Insert Purchase</p>
		<p>{client.user_fullname}</p>
	</div>

	<div class="mx-[16px] mt-[19px] text-[12px] font-semibold">
		<p>Total Amount: {totalAmount} Php</p>
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
						id="productPrice{index + 1}"
						name={`productPrice${index + 1}`}
						type="number"
						class="h-[35px] w-full rounded-[10px] border-[1px] border-black px-[12px] text-[10px] outline-none"
						on:change={(e) => detectValue(e.target)}
						on:click={(e) => setValue(e.target)}
						on:focus={(e) => setValue(e.target)}
						on:keydown={(e) => {
							if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
								e.preventDefault();
							}
						}}
					/>

					{#each actionFormErrors?.[`productPrice${index + 1}`] ?? [] as errorMsg}
						<p class="text-[12px] font-semibold text-red" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<div class="flex justify-end">
					<button
						type="button"
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
			disabled={uploadLoader}
			class="flex h-[35px] w-full items-center justify-center rounded-[10px] bg-black text-[12px] font-semibold text-white active:bg-opacity-80"
			type="submit"
		>
			<Loader name="Upload" loader={uploadLoader} loaderName="Uploading..." />
		</button>
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
