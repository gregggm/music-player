<script lang="ts">
  export let active: boolean;
</script>

<style>
  .view {
    display: flex;
    flex-direction: column;
  }
</style>

{#if active}
  <div class="view">
    <slot />
  </div>
{/if}
