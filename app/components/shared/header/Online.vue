<script setup>
import NumberFlow from '@number-flow/vue'
import { useIdle } from '@vueuse/core'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import Badge from '~/components/ui/badge/Badge.vue'

// State to store the online user count
const onlineUsers = ref(0)
let websocket = null

// Track user idle state (5 seconds)
const { idle } = useIdle(5000) // 5 seconds in milliseconds

// Function to establish WebSocket connection
function connectWebSocket() {
  const wsUrl = 'ws://localhost:8000/ws/online/' // Update with your domain
  websocket = new WebSocket(wsUrl)

  websocket.onopen = () => { }

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.online_users !== undefined) {
      onlineUsers.value = data.online_users
    }
  }

  websocket.onerror = () => {
    websocket = null
    if (useAuthenticateStore().isLogin && !idle.value) {
      setTimeout(connectWebSocket, 5000)
    }
  }

  websocket.onclose = () => {
    websocket = null
    if (useAuthenticateStore().isLogin && !idle.value) {
      setTimeout(connectWebSocket, 5000)
    }
  }
}

// Watch for idle state changes
watch(idle, (isIdle) => {
  if (isIdle && websocket) {
    websocket.close()
    websocket = null
    onlineUsers.value--
  }
  else if (!isIdle && !websocket && useAuthenticateStore().isLogin) {
    connectWebSocket()
    onlineUsers.value++
  }
})

const authStore = useAuthenticateStore()

// Connect on mount if authenticated and not idle
onMounted(() => {
  if (authStore.isLogin && !idle.value) {
    connectWebSocket()
  }
})

// Watch for authentication state changes
watch(() => authStore.isLogin, (newVal) => {
  if (newVal && !websocket && !idle.value) {
    connectWebSocket()
  }
  else if (!newVal && websocket) {
    websocket.close()
    websocket = null
  }
})

// Cleanup WebSocket on unmount
onUnmounted(() => {
  if (websocket) {
    websocket.close()
    websocket = null
  }
})
</script>

<template>
  <Badge v-if="authStore.isLogin" :variant="idle ? 'alert' : 'info'"
    class="min-w-20 duration-300 flex justify-center gap-1.5 relative">
    <span :class="cn('size-2 rounded-full animate-pulse', idle ? 'bg-alert-lighter' : 'bg-info-lighter')
      " />
    Online
    <NumberFlow :value="onlineUsers" />
  </Badge>
</template>
