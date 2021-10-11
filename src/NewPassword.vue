<template>
    <CreationForm @create='creation' @cancel='cancellation' :update='Boolean(data)'>
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
            <input type='text' v-model='notes'/>
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
            data: { required: false, },
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
                    await put('/passwords/' + this.data.uuid, data)
                else
                    await post('/passwords', data)

                this.saving = false
                this.root.route('PasswordListing', true)
            },
        },
    }
</script>
