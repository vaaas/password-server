<template>
    <table>
        <thead>
            <tr>
                <th v-for='x in fields'>
                    {{ x.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for='item in data' @click='$emit("row-clicked", item)'>
                <td v-for='x in fields'>
                    {{ item[x.key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
    table {
        width: 100%;
        border-spacing: 0px;
        border-collapse: collapse;
    }
    table th {
        text-align: left;
        padding: 0.25em;
        margin-bottom: 0.5em;
    }
    table thead {
        background: #ccc;
        border: var(--border);
    }
    table td { padding: 0.25em; }

    table tbody tr:hover { background: #fff; }
</style>

<script>
    export default {
        props: {
            fields: { required: true, type: Array },
            data: { required: true, type: Array },
        },
    }
</script>
