import { BillingPlan } from "./BillingPlan";
import { Gender } from "./Gender";

export interface UserData {
    firstName: string | null
    lastName: string | null
    birthday: string | null
    avatar: string | null
    gender: Gender | null
    billing: BillingPlan | null
}