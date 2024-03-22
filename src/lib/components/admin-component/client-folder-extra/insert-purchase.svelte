<script lang="ts">
	import { enhance } from '$app/forms';
	import Loader from '$lib/components/general-component/loader.svelte';
	import type { ResultModel, UserListTB } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';
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

	let initialVal: { id: string }[] = [{ id: crypto.randomUUID() }];
	let scrollValue: HTMLDivElement;
	let totalAmount = 0;
	let tempMemo = 0;

	let uploadLoader = false;
	let actionFormErrors: InsertPurchaseVal | null = null;

	const insertPurchaseActionNews: SubmitFunction = () => {
		actionFormErrors = null;
		uploadLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<InsertPurchaseAction>;

			switch (status) {
				case 200:
					totalAmount = 0;
					toast.success('Insert Purchase', { description: msg });
					initialVal = [{ id: crypto.randomUUID() }];
					uploadLoader = false;
					break;

				case 400:
					actionFormErrors = errors;
					uploadLoader = false;
					break;

				case 401:
					toast.error('Insert Purchase', { description: msg });
					actionFormErrors = null;
					uploadLoader = false;
					break;
			}
			await update();
		};
	};

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

	$: detectLength = initialVal.length <= 1;
</script>

<form
	method="post"
	action="?/insertPurchaseAction"
	enctype="multipart/form-data"
	use:enhance={insertPurchaseActionNews}
	class="mx-auto mt-[101px] min-h-[514px] bg-white pb-[45px] pt-[10px] sm:w-[416px]"
	in:scale
>
	<input name="clientRef" type="hidden" value={JSON.stringify(client)} hidden />
	<div
		class="relative flex flex-col items-center justify-center gap-[5px] text-[14px] font-semibold sm:text-[16px]"
	>
		<div class="absolute left-0 top-0">
			<button class=" p-2" on:click
				><img src={admin_arrowleft_icon} alt="arrow-left-icon" class="" />
			</button>
		</div>

		<p>Insert Purchase</p>
		<p>{client.user_fullname}</p>
	</div>

	<div class="mx-[16px] mt-[19px] text-[14px] sm:text-[16px]">
		<p>Total Amount: {totalAmount} Php</p>
	</div>
	<hr class="mt-[19px] w-full border-[1px] border-subWhite" />

	<div
		class="h-[300px] overflow-y-auto scroll-smooth sm:h-[400px] lg:h-[520px]"
		bind:this={scrollValue}
	>
		{#each initialVal as increment, index (increment.id)}
			<div
				class="mx-[22px] mt-[16px] flex flex-col gap-[5px]"
				in:fade={{ duration: 200 }}
				animate:flip={{ duration: 400 }}
			>
				<label>
					<span class="text-[14px] sm:text-[16px]">Product Name {index + 1}</span>
					<input
						name={`productName${index + 1}`}
						type="text"
						class="w-full rounded-[10px] border-[1px] border-black px-[12px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
					/>
					{#each actionFormErrors?.[`productName${index + 1}`] ?? [] as errorMsg}
						<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<label>
					<span class="text-[14px] sm:text-[16px]">Product Price {index + 1}</span>
					<input
						id="productPrice{index + 1}"
						name={`productPrice${index + 1}`}
						type="number"
						class="w-full rounded-[10px] border-[1px] border-black px-[12px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
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
						<p class="text-[14px] text-red sm:text-[16px]" in:fade>{errorMsg}</p>
					{/each}
				</label>

				<div class="flex justify-end">
					<button
						disabled={detectLength}
						type="button"
						class="w-[105px] rounded-[10px] bg-red py-[8.5px] text-[14px] font-semibold text-white sm:text-[16px] {detectLength
							? 'hidden'
							: ''}"
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
			class="w-full rounded-[10px] bg-black p-2 py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
			on:click={incrementHandler}>Increment</button
		>

		<button
			disabled={uploadLoader}
			class="flex w-full items-center justify-center rounded-[10px] bg-black py-[8.5px] text-[14px] font-semibold text-white active:bg-opacity-80 sm:text-[16px]"
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
