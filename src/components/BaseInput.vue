<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <input :class="{ error: error }" :value="value" v-bind="$attrs" v-on="listeners" @input="updateValue">
    </div>
</template>

<script>
    export default {
        // To the props 'type' and 'placeholder' don't be placed in the first div
        // -> Used together with v-bind="$attrs" to say where we want to apply them
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            error: Boolean,
            value: [String, Number]
        },
        computed: {
            // To resolve conflict between using @input and v-on="$listeners" at the same time
            // -> Like this we create a new listeners object where the input method is overwrite 
            listeners() {
                return {
                    ...this.$listeners,
                    input: this.updateValue 
                }
            }
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>