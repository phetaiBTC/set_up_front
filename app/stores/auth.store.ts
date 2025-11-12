import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const user = ref("phet")
    return {user}
});
