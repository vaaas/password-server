<template>
    <div class='accordion'>
        <header class='pointer' @click='open = !open'>{{ title }}</header>
        <div v-show='open'>
            <slot/>
        </div>
    </div>
</template>

<style>
    .accordion > header {
        background: #ccc;
        border: var(--border);
        padding: 0.5em;
        cursor: pointer;
    }
    .accordion > div {
        padding-left: 1em;
        border-left: var(--border);
    }
</style>

<script>
    export default {
        props: {
            title: { required: true, type: String },
        },

        data() { return {
            open: false,
        }},
    }
</script>
