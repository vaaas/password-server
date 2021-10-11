<template>
    <div class='creationform'>
        <slot/>
        <div class='buttons'>
            <button @click='$emit("cancel")'>Cancel</button>
            <button class='primary' @click='$emit("create")'>{{ update ? 'Update' : 'Create' }}</button>
        </div>
    </div>
</template>

<style>
    .creationform {
        margin-left: auto;
        margin-right: auto;
    }

    .creationform > .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.25rem;
    }
</style>

<script>
    export default {
        props: {
            update: { required: false, default: true, type: Boolean },
        },
    }
</script>
