<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <input v-bind="$attrs" @input="updateValue">
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
            value: [String, Number]
        },
        methods: {
            updateValue(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>