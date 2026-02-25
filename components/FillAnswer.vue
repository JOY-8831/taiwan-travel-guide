<template>
  <div class="input_block">
    <input
      v-if="type === 'number'"
      :id="id"
      v-model="internalValue"
      type="number"
      inputmode="numeric"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :required="required"
      @input="handleInput"
    />
    <select
      v-else-if="type === 'select'"
      :id="id"
      v-model="internalValue"
      :required="required"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
  type: 'number' | 'select'
  modelValue: string | number | null
  placeholder?: string
  min?: number
  max?: number
  required?: boolean
  options?: Array<{ label: string; value: string }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value ? parseInt(target.value) : null)
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style>
/* ========= Input Forms =========== */
.input.frame {
  align-items: stretch;
  gap: 14px;
}

.input.frame span {
  font-size: clamp(19px, 4.5vw, 23px);
  line-height: 1.4;
  color: var(--vanilla);
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

.input_block {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 4px solid var(--vanilla);
  background: color-mix(in oklab, var(--dark_blue) 40%, transparent);
  width: 100%;
  box-sizing: border-box;
}

.input_block input,
.input_block select {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 8px 10px;
  color: white;
  font-size: clamp(18px, 4vw, 22px);
  font-family: "Jersey 15", Helvetica, Arial, sans-serif;
}

.input_block input::placeholder { 
  color: grey;
  opacity: .9;
}

.input_block select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 18px;
  padding-right: 36px;
}

.input_block select:invalid {
  color: grey;
}

.input_block select:valid {
  color: white;
}

.input_block select option {
  background: rgba(0, 29, 98, 0.95);
  color: white;
}

#day_input .next_btn {
  width: 100%;
  margin-top: 10px;
}

</style>