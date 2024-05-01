import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 
import { HydratedDocument } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({timestamps: true,})
export class Role {

    @Prop({required: true})
    roleId: Number;

    @Prop({required: true})
    roleName: string
}

export const RoleSchema = SchemaFactory.createForClass(Role)