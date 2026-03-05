<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  active: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <button
    class="heart-btn"
    :class="{ 'active': isMounted && active }"
    type="button"
    :aria-pressed="isMounted && active ? 'true' : 'false'"
    aria-label="Toggle favorite"
    @click.stop="$emit('toggle')"
  >
    <svg v-show="!(isMounted && active)" width="32" height="32" viewBox="0 0 16 14" aria-hidden="true" class="icon-outline">
      <g>
        <rect x="8.70996" y="1.45158" width="1.45166" height="1.45166" />
        <rect x="10.1616" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="11.6133" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="13.0649" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="7.2583" y="2.90349" width="1.45166" height="1.45166" />
        <rect x="5.80664" y="1.45158" width="1.45166" height="1.45166" />
        <rect x="4.3551" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="2.90344" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="1.45178" y="0.000137329" width="1.45166" height="1.45166" />
        <rect x="14.5166" y="1.45158" width="1.45166" height="1.45166" />
        <rect x="14.5166" y="2.90349" width="1.45166" height="1.45166" />
        <rect x="14.5166" y="4.35493" width="1.45166" height="1.45166" />
        <rect x="13.0649" y="5.80638" width="1.45166" height="1.45166" />
        <rect x="11.6133" y="7.25829" width="1.45166" height="1.45166" />
        <rect x="10.1616" y="8.71021" width="1.45166" height="1.45166" />
        <rect x="8.70996" y="10.1617" width="1.45166" height="1.45166" />
        <rect x="0.00012207" y="1.45158" width="1.45166" height="1.45166" />
        <rect x="0.00012207" y="2.90349" width="1.45166" height="1.45166" />
        <rect x="0.00012207" y="4.35493" width="1.45166" height="1.45166" />
        <rect x="2.90344" y="7.25829" width="1.45166" height="1.45166" />
        <rect x="1.45178" y="5.80638" width="1.45166" height="1.45166" />
        <rect x="4.3551" y="8.71021" width="1.45166" height="1.45166" />
        <rect x="5.80664" y="10.1617" width="1.45166" height="1.45166" />
        <rect x="7.2583" y="11.6136" width="1.45166" height="1.45166" />
      </g>
    </svg>
    <svg v-show="isMounted && active" width="32" height="32" viewBox="0 0 20 16" aria-hidden="true" class="icon-filled">
      <g>
        <rect x="10.6667" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="12.4446" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="14.2222" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="16" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="8.88892" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="7.11108" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="5.3335" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="1.77783" y="0.000133514" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="1.77783" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
        <rect x="12.4446" y="1.77797" width="5.33325" height="5.33301" fill="#D18FA1"/>
        <rect x="7.11108" y="3.55526" width="5.33325" height="8.88916" fill="#D18FA1"/>
        <rect x="17.7778" y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="17.7778" y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="17.7778" y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="16" y="7.11109" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="14.2222" y="8.8888" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="12.4446" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="10.6667" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect y="1.77771" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect y="3.55566" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect y="5.33338" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="3.55542" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="5.33325" y="8.88881" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="5.33325" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="12.4443" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="12.4443" y="8.88875" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="14.2224" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="1.77783" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="3.55542" y="7.11097" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="5.3335" y="10.6668" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="7.11108" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="8.88892" y="14.2223" width="1.77778" height="1.77778" fill="#D18FA1"/>
        <rect x="8.88892" y="12.4445" width="1.77778" height="1.77778" fill="#D18FA1"/>
      </g>
    </svg>
  </button>
</template>

<style scoped>
.heart-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: inherit;
  transition: all 0.2s;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-btn .icon-outline rect {
    fill: currentColor; 
}

.heart-btn.active .icon-outline rect {
    fill: var(--pink); 
}

.heart-btn.active {
  color: var(--pink);
  transform: scale(1.1);
}
</style>
