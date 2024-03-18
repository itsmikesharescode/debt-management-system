<script lang="ts">
	export let admin_arrowleft_icon: string;
</script>

<div
	class="mx-auto mt-[101px] min-h-[336px] w-[255px] bg-white pb-[45px] pt-[10px] sm:w-[416px]"
	in:scale
>
	<div class="relative flex items-center justify-center">
		<div class="absolute left-0">
			<button class="flex items-center p-2">
				<img src={admin_arrowleft_icon} class="" alt="arrowleft-icon" />
			</button>
		</div>
		<p class="text-center text-[12px] font-semibold">Client Name here</p>
	</div>

	<hr class="mt-[11px] w-full border-[1px] border-subWhite" />
</div>
