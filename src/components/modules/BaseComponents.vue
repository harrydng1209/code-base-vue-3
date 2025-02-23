<script setup lang="ts">
import type { TDate, TOptions } from '@/models/types/shared.type';
import type { ElLoading } from 'element-plus';

import IconDashboard from '@/assets/icons/shared/IconDashboard.vue';
import IconDelete from '@/assets/icons/shared/IconDelete.vue';
import IconFolderShared from '@/assets/icons/shared/IconFolderShared.vue';
import IconNotification from '@/assets/icons/shared/IconNotification.vue';
import IconSearch from '@/assets/icons/shared/IconSearch.vue';
import IconSettings from '@/assets/icons/shared/IconSettings.vue';
import {
  baseCheckboxOptions,
  baseSelectOptions,
  suggestions,
  tableData,
} from '@/mocks/base-components.mock';
import { EToast } from '@/models/enums/shared.enum';
import { toTypedSchema } from '@vee-validate/yup';
import { useDebounceFn } from '@vueuse/core';
import { useForm } from 'vee-validate';
import {
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString,
} from 'yup';

const { REGEXES, SELECTORS } = constants.shared;
const { themeColors } = constants;
const { DEFAULT } = constants.themeColors;
const { hideLoading, showLoading, showToast, sleep } = utils.shared;

interface IForm {
  email: string;
  fullName: string;
  isTerms: boolean;
  password: string;
  passwordConfirm: string;
  type: string;
}

type TIcons = Record<string, () => Promise<{ default: Component }>>;

const schema = yupObject({
  email: yupString()
    .required('Email is required')
    .matches(REGEXES.EMAIL, 'Invalid email format'),
  fullName: yupString()
    .required('Full name is required')
    .matches(REGEXES.DISPLAY_NAME, 'Name can only contain letters and spaces'),
  isTerms: yupBoolean()
    .required()
    .isTrue('You must agree to the terms and conditions'),
  password: yupString()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirm: yupString()
    .required('Password confirmation is required')
    .oneOf([yupRef('password')], 'Passwords must match'),
  type: yupString().required('Account type is required'),
});
const { handleSubmit, resetForm } = useForm<IForm>({
  initialValues: {
    email: '',
    fullName: '',
    isTerms: false,
    password: '',
    passwordConfirm: '',
    type: '',
  },
  validationSchema: toTypedSchema(schema),
});
const { t } = useI18n();
const { theme } = useTheme();
const { showConfirmDialog } = useConfirmDialog();
const { pagination } = usePagination();
const { handleCatchError } = useHandleCatchError();

const baseSelect = ref<TOptions>();
const baseMultipleSelect = ref<TOptions[]>([]);
const baseInput = ref<string>('');
const baseInputNumber = ref<number>(0);
const baseAutocomplete = ref<string>('');
const baseDatePicker = ref<TDate>(Date.now());
const baseTimePicker = ref<TDate>(Date.now());
const isBaseSwitch = ref<boolean>(true);
const isBaseDialog = ref<boolean>(false);
const isBaseCheckbox = ref<boolean>(false);
const baseCheckboxGroup = ref<string[]>([]);
const isBaseCheckboxAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(false);
const searchInput = ref<string>('');
const svgIcons = ref<Record<string, Component>>({});

const handleClickButton = useDebounceFn(() => {
  showToast('handleClickButton');
}, 200);

const handleChangeSelect = (value: unknown) => {
  showToast(`handleChangeSelect: ${value}`);
};

const handleClickIconSvg = useDebounceFn(() => {
  showToast('handleClickIconSvg');
}, 200);

const handleChangeCheckbox = (value: boolean) => {
  showToast(`handleChangeCheckbox: ${value}`);
};

const handleChangeInput = useDebounceFn((value: number | string) => {
  showToast(`handleChangeInput: ${value}`);
}, 200);

const handleChangeDatePicker = (value: unknown) => {
  showToast(`handleChangeDatePicker: ${value}`);
};

const handleChangeTimePicker = (value: unknown) => {
  showToast(`handleChangeTimePicker: ${value}`);
};

const handleChangeSwitch = (value: boolean) => {
  showToast(`handleChangeSwitch: ${value}`);
};

const handleDialog = () => {
  isBaseDialog.value = false;
  showToast('handleConfirmDialog', EToast.Info);
};

const handleChangePagination = (currentPage: number, pageSize: number) => {
  pagination.value.currentPage = currentPage;
  pagination.value.pageSize = pageSize;
  showToast(`currentPage: ${currentPage} & pageSize: ${pageSize}`);
};

const onSubmit = handleSubmit((values) => {
  console.info('onSubmit:', values);
  showToast('onSubmit: check console');
});

const handleGetHealthCheck = useDebounceFn(async () => {
  try {
    await apis.shared.healthCheck();
  } catch (error) {
    handleCatchError(error);
  }
}, 200);

const fetchSuggestions = (
  queryString: string,
  callback: (
    data: {
      value: string;
    }[],
  ) => void,
) => {
  const results = suggestions.filter((suggestion) =>
    suggestion.value.toLowerCase().includes(queryString.toLowerCase()),
  );
  callback(results);
};

const handleCheckAllChange = (value: boolean) => {
  const optionValue = baseCheckboxOptions.map((option) => option.value);
  baseCheckboxGroup.value = value ? optionValue : [];
  isIndeterminate.value = false;
};

const handleCheckboxGroupChange = (value: string[]) => {
  const checkedCount = value.length;
  isBaseCheckboxAll.value = checkedCount === baseCheckboxOptions.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < baseCheckboxOptions.length;
};

const confirmDelete = () => {
  showConfirmDialog({
    cancelButtonText: 'No, Cancel',
    confirmButtonText: 'Yes, Delete',
    message: 'Proxy will permanently delete the file. Continue?',
    onCancel: () => {
      showToast('File deletion has been canceled');
    },
    onConfirm: () => {
      showToast('File has been successfully deleted');
    },
    title: 'Warning',
  });
};

const handleLoadingFullscreen = async () => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;
  loadingInstance = showLoading('fullscreen');
  await sleep(3);
  hideLoading(loadingInstance);
};

const handleLoadingSection = async () => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;
  loadingInstance = showLoading(SELECTORS.LOADING_SECTION);
  await sleep(3);
  hideLoading(loadingInstance);
};

const loadSvgIcons = async () => {
  const icons = import.meta.glob('@/assets/icons/**/*.vue') as TIcons;

  for (const path in icons) {
    const iconName = path.split('/').pop();

    if (iconName) {
      const iconComponent = await icons[path]();
      svgIcons.value[iconName] = markRaw(iconComponent.default);
    }
  }
};

onMounted(() => {
  pagination.value.total = 1000;
  loadSvgIcons();
});
</script>

<template>
  <div class="container">
    <section>
      <h4>-- i18n --</h4>
      <div class="tw-flex tw-items-center tw-gap-4">
        <p>{{ t('shared.hello') }}</p>
      </div>
    </section>

    <section :id="SELECTORS.APIS_SECTION">
      <h4>-- APIs --</h4>
      <BaseButton @click="handleGetHealthCheck">Health Check</BaseButton>
    </section>

    <section :id="SELECTORS.LOADING_SECTION">
      <h4>-- The Loading --</h4>
      <BaseButton @click="handleLoadingFullscreen">Fullscreen</BaseButton>
      <BaseButton @click="handleLoadingSection">Section</BaseButton>
    </section>

    <section>
      <h4>-- SVG Icons --</h4>
      <div class="tw-flex tw-gap-2">
        <component
          v-for="(IconComponent, iconName) in svgIcons"
          :key="iconName"
          :is="IconComponent"
          @click="handleClickIconSvg"
          v-tippy="iconName"
        />
      </div>
    </section>

    <section>
      <h4>-- Base Buttons --</h4>
      <div class="tw-mb-4">
        <BaseButton type="primary" @click="handleClickButton">
          Primary
        </BaseButton>
        <BaseButton type="info" @click="handleClickButton">Info</BaseButton>
        <BaseButton type="success" @click="handleClickButton">
          Success
        </BaseButton>
        <BaseButton type="warning" @click="handleClickButton">
          Warning
        </BaseButton>
        <BaseButton type="danger" @click="handleClickButton">Danger</BaseButton>
        <BaseButton type="default" @click="handleClickButton">
          Default
        </BaseButton>
      </div>

      <div class="tw-mb-4">
        <BaseButton type="primary" plain @click="handleClickButton">
          Primary
        </BaseButton>
        <BaseButton type="info" plain @click="handleClickButton">
          Info
        </BaseButton>
        <BaseButton type="success" plain @click="handleClickButton">
          Success
        </BaseButton>
        <BaseButton type="warning" plain @click="handleClickButton">
          Warning
        </BaseButton>
        <BaseButton type="danger" plain @click="handleClickButton">
          Danger
        </BaseButton>
        <BaseButton type="default" plain @click="handleClickButton">
          Default
        </BaseButton>
      </div>

      <div>
        <BaseButton type="primary" circle @click="handleClickButton">
          <template #icon>
            <IconSearch :fill="DEFAULT.WHITE" />
          </template>
        </BaseButton>

        <BaseButton type="info" circle @click="handleClickButton">
          <template #icon>
            <IconSettings :fill="DEFAULT.WHITE" />
          </template>
        </BaseButton>

        <BaseButton type="success" circle @click="handleClickButton">
          <template #icon>
            <IconDashboard :fill="DEFAULT.WHITE" />
          </template>
        </BaseButton>

        <BaseButton type="warning" circle @click="handleClickButton">
          <template #icon>
            <IconFolderShared :fill="DEFAULT.WHITE" />
          </template>
        </BaseButton>

        <BaseButton type="danger" circle @click="handleClickButton">
          <template #icon>
            <IconDelete />
          </template>
        </BaseButton>

        <BaseButton type="default" circle @click="handleClickButton">
          <template #icon>
            <IconNotification :fill="themeColors[theme].ICON_SVG" />
          </template>
        </BaseButton>
      </div>
    </section>

    <section>
      <h4>-- Base Selects --</h4>
      <BaseSelect
        v-model="baseSelect"
        :options="baseSelectOptions"
        placeholder="Please select"
        class="!tw-w-[150px]"
        @change="handleChangeSelect"
      />

      <BaseSelect
        v-model="baseMultipleSelect"
        multiple
        collapseTags
        collapseTagsTooltip
        placeholder="Please multiple select"
        :options="baseSelectOptions"
        class="!tw-w-[200px] tw-ml-4"
        @change="handleChangeSelect"
      />
    </section>

    <section>
      <h4>-- Base Checkboxes --</h4>
      <div>
        <BaseCheckbox v-model="isBaseCheckbox" @change="handleChangeCheckbox">
          checkbox label
        </BaseCheckbox>
      </div>

      <BaseCheckbox
        v-model="isBaseCheckboxAll"
        :indeterminate="isIndeterminate"
        class="tw-mt-4"
        @change="handleCheckAllChange"
      >
        Check all
      </BaseCheckbox>
      <BaseCheckboxGroup
        v-model="baseCheckboxGroup"
        :options="baseCheckboxOptions"
        @change="handleCheckboxGroupChange"
      />
    </section>

    <section>
      <h4>-- Base Switches --</h4>
      <BaseSwitch
        v-model="isBaseSwitch"
        activeText="switch label"
        @change="handleChangeSwitch"
      />
    </section>

    <section>
      <h4>-- Base Autocompletes --</h4>
      <BaseAutocomplete
        v-model="baseAutocomplete"
        placeholder="Please input"
        :fetchSuggestions="fetchSuggestions"
        class="!tw-w-[200px]"
      />
    </section>

    <section>
      <h4>-- Base Inputs --</h4>
      <div class="tw-flex tw-gap-2">
        <BaseInput
          v-model="baseInput"
          placeholder="Please input"
          class="!tw-w-[200px]"
          @input="handleChangeInput"
        />

        <BaseInputNumber
          v-model="baseInputNumber"
          controlsPosition="right"
          placeholder="Please input number"
          class="!tw-w-[200px]"
          @change="handleChangeInput"
        />

        <BaseInput
          v-model="searchInput"
          :placeholder="`${t('shared.search')}...`"
          :clearable="true"
          class="!tw-w-[300px]"
        >
          <template #suffix>
            <IconSearch :fill="themeColors[theme].ICON_SVG" />
          </template>
        </BaseInput>
      </div>
    </section>

    <section>
      <h4>-- Base DatePickers --</h4>
      <BaseDatePicker
        v-model="baseDatePicker"
        placeholder="Pick a day"
        @change="handleChangeDatePicker"
      />
    </section>

    <section>
      <h4>-- Base TimePickers --</h4>
      <BaseTimePicker
        v-model="baseTimePicker"
        placeholder="Pick a time"
        @change="handleChangeTimePicker"
      />
    </section>

    <section>
      <h4>-- Base Dialogs --</h4>
      <BaseButton @click="isBaseDialog = true">Open Dialog</BaseButton>
      <BaseDialog v-model="isBaseDialog" title="Dialog Title" width="500">
        <span>This is a dialog content</span>
        <template #footer>
          <div class="dialog-footer">
            <BaseButton type="primary" @click="handleDialog">OK</BaseButton>
          </div>
        </template>
      </BaseDialog>

      <BaseButton class="tw-ml-4" @click="confirmDelete"
        >Open Confirm Dialog</BaseButton
      >
    </section>

    <section>
      <h4>-- Base Tables --</h4>
      <BaseTable :data="tableData" height="300" rowKey="date">
        <ElTableColumn type="index" width="50" />
        <ElTableColumn prop="date" label="Date" width="120" />
        <ElTableColumn prop="name" label="Name" width="150" />
        <ElTableColumn prop="address" label="Address" width="200" />
        <ElTableColumn prop="email" label="Email" width="180" />
        <ElTableColumn prop="phone" label="Phone" width="150" />
        <ElTableColumn prop="age" label="Age" width="80" />
        <ElTableColumn prop="occupation" label="Occupation" width="150" />
        <ElTableColumn prop="company" label="Company" width="150" />
        <ElTableColumn prop="salary" label="Salary" width="120" />
        <ElTableColumn prop="department" label="Department" width="150" />
        <ElTableColumn prop="city" label="City" width="120" />
        <ElTableColumn prop="country" label="Country" width="120" />
        <ElTableColumn prop="zipCode" label="Zip Code" width="120" />

        <template #tfoot>
          <BasePagination
            :total="pagination.total"
            @change="handleChangePagination"
          />
        </template>
      </BaseTable>

      <div class="tw-mt-4 tw-flex-center">usePagination: {{ pagination }}</div>
    </section>

    <section>
      <h4>-- Base Forms --</h4>
      <ElForm
        labelWidth="auto"
        labelPosition="top"
        style="max-width: 600px"
        @submit="onSubmit"
      >
        <div class="tw-grid tw-grid-cols-2 tw-gap-4">
          <BaseFormItem name="fullName" label="Full name">
            <template #default="{ modelValue, updateModelValue }">
              <BaseInput
                placeholder="Enter your full name"
                :modelValue="modelValue"
                @input="updateModelValue"
              />
            </template>
          </BaseFormItem>

          <BaseFormItem name="type" label="Type">
            <template #default="{ modelValue, updateModelValue }">
              <BaseSelect
                :modelValue="modelValue"
                placeholder="Choose a type"
                :options="baseSelectOptions"
                @change="updateModelValue"
              />
            </template>
          </BaseFormItem>
        </div>

        <div class="tw-grid tw-grid-cols-3 tw-gap-4">
          <BaseFormItem name="email" label="Email">
            <template #default="{ modelValue, updateModelValue }">
              <BaseInput
                placeholder="Enter your email address"
                :modelValue="modelValue"
                @input="updateModelValue"
              />
            </template>
          </BaseFormItem>

          <BaseFormItem name="password" label="Password">
            <template #default="{ modelValue, updateModelValue }">
              <BaseInput
                placeholder="Create a password"
                :modelValue="modelValue"
                showPassword
                @input="updateModelValue"
              />
            </template>
          </BaseFormItem>

          <BaseFormItem name="passwordConfirm" label="Confirm Password">
            <template #default="{ modelValue, updateModelValue }">
              <BaseInput
                placeholder="Re-enter your password"
                :modelValue="modelValue"
                showPassword
                @input="updateModelValue"
              />
            </template>
          </BaseFormItem>
        </div>

        <BaseFormItem name="isTerms">
          <template #default="{ modelValue, updateModelValue }">
            <BaseCheckbox :modelValue="modelValue" @change="updateModelValue">
              Agree to terms and conditions
            </BaseCheckbox>
          </template>
        </BaseFormItem>

        <div>
          <BaseButton type="primary" nativeType="submit">Submit</BaseButton>
          <BaseButton type="info" nativeType="button" @click="resetForm()">
            Reset
          </BaseButton>
        </div>
      </ElForm>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
  @include flexbox-style(0, unset, unset, column);

  > section {
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 20px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      border-bottom: 1px dashed var(--v-text-color);
    }
  }

  h4 {
    margin: 0;
    margin-bottom: 8px;
  }
}
</style>
