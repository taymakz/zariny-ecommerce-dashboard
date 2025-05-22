<script setup lang="ts">
import { Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as Yup from 'yup'
import Badge from '~/components/ui/badge/Badge.vue'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import { UserLogin } from '~/services/user'

const schema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .required()
    .max(16)
    .min(4),

})
const authStore = useAuthenticateStore()
const form = reactive({
  email: '',
  password: '',
})
const error = ref('')
const loading = ref(false)

async function submit() {
  if (loading.value || !form.email || !form.password)
    return
  loading.value = true

  const result = await UserLogin({
    email: form.email,
    password: form.password,
  })
  loading.value = false

  if (result.success) {
    toast('Logged in Successfuly')
    form.email = ''
    form.password = ''
    await authStore.Login(result.data.email)
    await authStore.SetRole()
  }
  else {
    error.value = result.message
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <!-- Section Title -->
    <div class="col-span-1 p-8">
      <div class="space-y-1">
        <p class="text-lg font-semibold">
          Authentication
        </p>
        <p class="text-foreground-muted text-sm">
          You need to authenticate to use the admin panel
        </p>
      </div>
    </div>
    <div class="col-span-2 p-8">
      <div>
        <div class="mb-6 flex items-center gap-2">
          <p class="text-lg font-semibold">
            Status
          </p>
          <Badge v-if="authStore.isLogin" variant="success">
            Logged In
          </Badge>
          <Badge v-else variant="warning">
            Not Logged In
          </Badge>
        </div>
        <Form v-if="!authStore.isLogin" v-slot="{ meta }" :validation-schema="schema" @submit="submit">
          <div class="flex gap-2">
            <Field v-slot="{ field }" name="email" validate-on-blur class="w-70">
              <Input v-bind="field" v-model="form.email" label="Email" class="h-10 w-full" with-error-message />
            </Field>
            <Field v-slot="{ field }" name="password" validate-on-blur class="w-70">
              <Input v-bind="field" v-model="form.password" type="password" label="Password" class="h-10 w-full"
                with-error-message />
            </Field>
          </div>
          <div class="flex justify-between">
            <p class="text-warning text-sm">
              {{ error }}
            </p>
            <Button :loading class="w-24" size="sm" :disabled="!meta.valid" @click="submit">
              Login
            </Button>
          </div>
        </Form>

        <div v-else>
          <div class="flex w-fit items-center justify-between gap-6">
            <p class="text-foreground-muted text-sm">
              Logged in as <span class="text-brand-lighter">{{ authStore.getUserEmail }}</span>
            </p>
            <Button :loading="authStore.getLoading" class="w-24" variant="warning" size="sm"
              @click="authStore.Logout()">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
