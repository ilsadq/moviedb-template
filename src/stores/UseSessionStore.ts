import {create} from "zustand";

interface GuestSessionState {
    guestSessionId: string | null,
    expiresAt: string | Date | null,
    setGuestSession: (state: string) => void,
    setExpiresAt: (state: string | Date) => void
}

const useSessionStore = create<GuestSessionState>((set) => ({
    guestSessionId: null,
    expiresAt: null,
    setGuestSession: (sessionId) => set(state => ({
        ...state,
        guestSessionId: sessionId
    })),
    setExpiresAt: (expiresAt) => set(state => ({
        ...state,
        expiresAt: new Date(expiresAt)
    }))
}))

export default useSessionStore;
