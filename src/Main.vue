<template>
    <div v-if='password'>
        <HeaderBar :root='this' v-model='search'/>
        <main>
            <component :is='component' v-bind='bound_props'/>
        </main>
    </div>
</template>

<style>
    :root {
        --border: 1px solid rgba(0,0,0,0.25);
    }

    html {
        min-height: 100vh;
        background: #ccc;
        color: #444;
        font-family: sans-serif;
        font-size: 16px;
        max-width: 60em;
        margin: auto;
        border-left: var(--border);
        border-right: var(--border);
    }

    body {
        margin: 0;
        min-height: 100vh;
        background: #eee;

    }

    main { padding: 1em; }

    .pointer { cursor: pointer; }

    button {
        display: block;
        padding: 0.5em 1em;
        background: linear-gradient(to bottom, #eee, #ddd);
        border: var(--border);
        border-radius: 0.25em;
    }

    button:hover, button:focus { background: #eee; }
    button:active { background: #ddd; }
    button.primary { background: linear-gradient(to bottom, #4be, #3ad); }
    button.primary:hover, button.primary:focus { background: #4be; }
    button.primary:active { background: #3ad; }

    input[type='text'] {
        border: var(--border);
        font-size: 0.9rem;
        margin: 0;
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
    }
</style>

<script>
    import PasswordListing from './PasswordListing.vue'
    import HeaderBar from './HeaderBar.vue'
    import NewPassword from './NewPassword.vue'

	export default {
		data() {
            const me = {}
			me.test = 'Hello, world!'
            me.password = null
            me.search = ''
            me.component = 'PasswordListing'
            me.bound_props = { root: this, search: me.search }
            return me
		},

        async mounted() {
            this.password = await this.authorise()
        },

        components: { HeaderBar, PasswordListing, NewPassword, },

        methods: {
            async authorise() {
                while(true) {
                    const password = prompt('Password')
                    if (!password) continue
                    const response = await fetch('/authorise', {method: 'POST', headers: { password }, body: ''})
                    if (response.status === 200)
                        return password
                }
            },

            route(component, props={}) {
                this.component = component
                this.bound_props = { ...props, root: this }
            },

            post(url, data) {
                return fetch(url, {
                    method: 'POST',
                    headers: { password: this.password },
                    body: typeof data === 'object' ? JSON.stringify(data) : data+''
                })
            },

            put(url, data) {
                return fetch(url, {
                    method: 'PUT',
                    headers: { password: this.password },
                    body: typeof data === 'object' ? JSON.stringify(data) : data+''
                })
            },

            get(url) {
                return fetch(url, {
                    headers: { password: this.password },
                })
            },
        },
	}
</script>
