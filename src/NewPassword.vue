<template>
    <CreationForm style='max-width: 30rem' @create='creation' @cancel='cancellation' :update='Boolean(data)'>
        <LabelForm label='Title'>
            <input type='text' v-model='title'/>
        </LabelForm>

        <LabelForm label='Username'>
            <input type='text' v-model='username'/>
        </LabelForm>

        <LabelForm label='Password'>
            <input type='text' v-model='password'/>
        </LabelForm>

        <LabelForm label='URL'>
            <input type='text' v-model='url'/>
        </LabelForm>

        <LabelForm label='Notes'>
            <textarea rows='5' v-model='notes'></textarea>
        </LabelForm>

        <LabelForm label='Group'>
            <input type='text' v-model='group'/>
        </LabelForm>
    </CreationForm>
</template>

<script>
    import CreationForm from './CreationForm.vue'
    import LabelForm from './LabelForm.vue'

    export default {
        components: { CreationForm, LabelForm },

        props: {
            data: { required: false, default: null, },
            root: { required: true, type: Object },
        },

        data() { return {
            title: '',
            username: '',
            password: '',
            url: '',
            notes: '',
            group: '',
            saving: false,
        }},

        activated() {
            if (this.data) {
                this.title = this.data.title || ''
                this.username = this.data.username || ''
                this.password = this.data.password || ''
                this.url = this.data.url || ''
                this.notes = this.data.notes || ''
                this.group = this.data.group || ''
            } else {
                this.title = ''
                this.username = ''
                this.password = ''
                this.url = ''
                this.notes = ''
                this.group = ''
            }
        },

        methods: {
            async creation() {
                this.saving = true

                const data = {
                    title: this.title,
                    username: this.username,
                    password: this.password,
                    url: this.url,
                    notes: this.notes,
                    group: this.group,
                }

                if (this.data)
                    await this.root.put('/passwords/' + this.data.uuid, data)
                else
                    await this.root.post('/passwords', data)

                this.saving = false
                this.root.route('PasswordListing', { reload: true })
            },

            cancellation() {
                this.root.route('PasswordListing')
            },
        },
    }
</script>
