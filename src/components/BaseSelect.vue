<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select :class="{ error: error }" :value="value" @change="updateValue" v-bind="$attrs" v-on="$listeners">
            <option 
                v-for="option in options" 
                :key="option"
                :value="option"
                :selected="option === value"
            >{{ option }}</option>
        </select>
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
            options: {
                type: Array,
                required: true
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
</script>