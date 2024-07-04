import useAuth from "./useAuth"
import useAxiosPrivate from "./usePrivate"

export default function useEthe() {

    const { isLoggedIn, setUser, setIsLoggedIn } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    async function getEthereum() {
        if (!isLoggedIn) {
            return
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/balance')
            
            return data;
        } catch (error) {
            console.log("===", error.response)
        }
    }

    return getEthereum
}


