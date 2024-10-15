import { defineStore } from 'pinia';
import { ERole } from '@/models/enums/shared.enum';
import type { IUserInfo } from '@/models/interfaces/shared.interface';
// import { getUserInfo } from '@/apis/user';
// import { getToken } from '@/utils/auth';

const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref<boolean>(false);
  const userRole = ref<ERole>();
  const userInfo = ref<IUserInfo>();

  const initialize = async () => {
    // if (isAuthenticated.value) return;
    // const isLoggedIn = !!getToken().accessToken;
    // if (!isLoggedIn) return;
    // try {
    //   const response = await getUserInfo();
    //   if (response && response.data) {
    //     isAuthenticated.value = true;
    //     userRole.value = response.data.role;
    //     userInfo.value = response.data;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const getGetters = () => {
    return {
      getAuthenticated: computed(() => isAuthenticated.value),
      getRole: computed(() => userRole.value),
      getUserInfo: computed(() => userInfo.value)
    };
  };

  const getActions = () => {
    return {
      setLogin: (data: IUserInfo) => {
        isAuthenticated.value = true;
        userRole.value = data.role;
        userInfo.value = data;
      },
      setLogout: () => {
        isAuthenticated.value = false;
        userRole.value = undefined;
        userInfo.value = undefined;
      }
    };
  };

  return { ...getGetters(), ...getActions(), initialize };
});

export default useAuthStore;
