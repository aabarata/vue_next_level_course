export const formFieldMixin = {
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
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value)
        }
    }
}