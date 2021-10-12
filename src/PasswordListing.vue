<template>
    <Accordion v-for='group in Object.keys(grouped).sort()' :title='group'>
        <MyTable :fields='fields' :data='grouped[group]' @row-clicked='root.route("NewPassword", { data: $event })'/>
    </Accordion>
</template>

<script>
    import MyTable from './MyTable.vue'
    import Accordion from './Accordion.vue'

    export default {
        props: {
            reload: { default: false, type: Boolean },
            root: { required: true, type: Object },
        },

        components: { MyTable, Accordion, },

        computed: {
            grouped() {
                let data = Object.entries(this.passwords).map(([k, v]) => ({ ...v, uuid: k }))
                if (this.root.search.length)
                    data = data.filter(x => [x.title || '', x.url || '', x.username || '']
                        .map(x => x.toLowerCase())
                        .some(has(this.root.search.toLowerCase())))
                if (data.length === 0) return {}
                data = data.sort(by(x => x.title))
                data = group(x => x.group || 'No group', data)
                return data
            }
        },

        data() { return {
            passwords: [],
            fields: [
                { key: 'title', label: 'Title', },
                { key: 'url', label: 'URL', },
                { key: 'username', label: 'Username' },
            ],
        }},

        async mounted() {
            this.update_passwords()
        },

        activated() {
            if (this.reload) this.update_passwords()
        },

        methods: {
            async update_passwords() {
                this.passwords = await this.root.get('/passwords').then(x => x.json())
            },
        },
    }
</script>
