<script lang="ts">
	export let name = '';
	export let loader = false;
	export let loaderName = '';
	export let color = 'border-b-black';
</script>

{#if loader}
	<div class="">
		<div class="h-4 w-4 animate-spin rounded-full border-2 {color}"></div>
		<span>{loaderName}</span>
	</div>
{:else}
	<span>{name}</span>
{/if}
