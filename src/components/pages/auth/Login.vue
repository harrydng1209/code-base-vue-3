<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object as yupObject, string as yupString } from 'yup';
import useAuthStore from '@/stores/auth.store';
import { EToast } from '@/models/enums/shared.enum';

const schema = toTypedSchema(
  yupObject({
    email: yupString()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Custom email regex validation failed'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
  })
);

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {}
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = handleSubmit(async (values: unknown) => {
  try {
    const response = await apis.auth.login(values);
    if (!utils.shared.isSuccessResponse(response)) throw new Error(response.error.message);

    authStore.setToken(response.data.accessToken);
    await router.push(constants.routePages.DASHBOARD);
  } catch (_error: unknown) {
    utils.shared.showToast('Login error', EToast.Error);
  }
});
</script>

<template>
  <div class="login">
    <section>
      <h4>{{ t('auth.login') }}</h4>

      <ElForm @submit="onSubmit" labelWidth="auto" labelPosition="top" hideRequiredAsterisk>
        <BaseFormItem name="email">
          <template #label>
            <span>{{ t('auth.email') }}</span>
            <BaseIconSvg
              width="5"
              height="10"
              :path="constants.shared.ICON_PATHS.SHARED_REQUIRED"
            />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              placeholder="name@email.com"
              :modelValue="modelValue"
              @input="updateModelValue"
            />
          </template>
        </BaseFormItem>

        <BaseFormItem name="password">
          <template #label>
            <span>{{ t('auth.password') }}</span>
            <BaseIconSvg
              width="5"
              height="10"
              :path="constants.shared.ICON_PATHS.SHARED_REQUIRED"
            />
          </template>

          <template #default="{ modelValue, updateModelValue }">
            <BaseInput
              :placeholder="t('auth.inputPassword')"
              :modelValue="modelValue"
              @input="updateModelValue"
              :type="showPassword ? 'text' : 'password'"
            >
              <template #suffix>
                <BaseIconSvg
                  width="20"
                  height="20"
                  :path="
                    showPassword
                      ? constants.auth.ICON_PATHS.EYE
                      : constants.auth.ICON_PATHS.EYE_CLOSED
                  "
                  @click="togglePasswordVisibility"
                />
              </template>
            </BaseInput>
          </template>
        </BaseFormItem>

        <div>
          <BaseButton
            type="primary"
            native-type="submit"
            class="tw-w-full"
            :id="constants.shared.SELECTOR_IDS.LOGIN_BUTTON_ID"
          >
            {{ t('auth.login') }}
          </BaseButton>
        </div>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/pages/auth/login.scss';
</style>
