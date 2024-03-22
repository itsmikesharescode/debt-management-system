<script lang="ts">
	export let searchValue = '';
</script>

<input
	bind:value={searchValue}
	type="text"
	class=" w-full rounded-[10px] border-[1px] border-black px-[18px] py-[8.5px] text-[14px] outline-none sm:text-[16px]"
	placeholder="Search Client"
/>
