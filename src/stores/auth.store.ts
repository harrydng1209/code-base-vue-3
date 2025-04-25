import type { IUserInfo } from '@/models/interfaces/auth.interface';

import { profile, refreshToken as refreshTokenApi } from '@/apis/auth.api';
import { STORAGE_KEYS } from '@/constants/shared.const';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = useLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, '');

  const isAuthenticated = ref<boolean>(false);
  const userInfo = ref<IUserInfo>();

  const getUserRole = computed(() => userInfo.value?.role);

  const initialize = async () => {
    if (isAuthenticated.value) return;

    const isLoggedIn = Boolean(accessToken.value);
    if (!isLoggedIn) return;

    try {
      const response = await profile();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    userInfo.value = undefined;
    accessToken.value = null;
  };

  const refreshToken = async (): Promise<boolean> => {
    let result = true;
    try {
      const response = await refreshTokenApi();
      accessToken.value = response.data.accessToken;
    } catch (error) {
      console.error(error);
      result = false;
    }
    return result;
  };

  const setToken = (token: string) => {
    accessToken.value = token;
  };

  const setUser = (data: IUserInfo) => {
    isAuthenticated.value = true;
    userInfo.value = data;
  };

  return {
    accessToken,
    getUserRole,
    initialize,
    isAuthenticated,
    logout,
    refreshToken,
    setToken,
    setUser,
  };
});
