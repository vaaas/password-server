<template>
    <fieldset class='labelform'>
        <label>{{ label }}</label>
        <slot/>
    </fieldset>
</template>

<style>
    .labelform {
        display: flex;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .labelform > label {
        width: 10em;
        text-align: left;
    }
    .labelform > input { width: 100%; }
</style>

<script>
    export default {
        props: {
            label: { required: true, type: String },
        },
    }
</script>
