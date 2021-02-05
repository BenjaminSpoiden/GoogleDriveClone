import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { FirebaseUser } from "../utils/types"

export const useAuth = () => {
   
   const [state, setState] = useState(() => { 
      const user = auth.currentUser 
      return {
         loading: !user,
         user
      }
   })

   const onChange = ({user}: FirebaseUser) => {
      setState({
         loading: false,
         user
      })
   }

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         onChange({
            user
         })
      })
      return () => unsubscribe()
   }, [])

   return state
}