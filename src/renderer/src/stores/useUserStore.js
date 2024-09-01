import create from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  userType: null,
  setUser: (user, userType) => set({ user, userType }),
  clearUser: () => set({ user: null, userType: null })
}))

export default useUserStore
