<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <input :class="{ error: error }" :value="value" v-bind="$attrs" v-on="listeners" @input="updateValue">
    </div>
</template>

<script>
    import { formFieldMixin } from '@/mixins/formFieldMixin'

    export default {
        mixins: [formFieldMixin],
        computed: {
            // To resolve conflict between using @input and v-on="$listeners" at the same time
            // -> Like this we create a new listeners object where the input method is overwrite 
            listeners() {
                return {
                    ...this.$listeners,
                    input: this.updateValue 
                }
            }
        }
    }
</script>