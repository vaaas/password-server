<template>
    <header class='headerbar'>
        <button @click='root.route("NewPassword", { search: root.search })'>New Password</button>
        <h1>Password Server</h1>
        <input type='text' :value='modelValue' @input='$emit("update:modelValue", $event.target.value)'/>
    </header>
</template>

<style>
    .headerbar {
        display: flex;
        align-items: center;
        background: #ddd;
        padding: 5px 10px;
        border-bottom: 2px solid rgba(0,0,0,0.25);
    }

    .headerbar > h1 {
        flex: 1;
        text-align: center;
        font-size: 1rem;
        margin: 0;
    }
</style>

<script>
    export default {
        props: {
            modelValue: { required: true, type: String },
            root: { required: true, type: Object },
        },
    }
</script>
