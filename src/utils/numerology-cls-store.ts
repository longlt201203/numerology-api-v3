import { ProfileDto } from "@modules/auth/dto";
import { ClsStore } from "nestjs-cls";

export interface NumerologyClsStore extends ClsStore {
    profile: ProfileDto;
}