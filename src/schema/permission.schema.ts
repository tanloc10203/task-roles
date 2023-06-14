import { object, string, TypeOf } from "zod";

export const PermissionCreateSchema = object({
  body: object({
    name: string({
      required_error: "Tên quyền là trường bắt buộc",
    }),
    desc: string({
      required_error: "Mô tả là trường bắt buộc",
    }),
    slug: string({
      required_error: "Slug là trường bắt buộc",
    }),
  }),
});

export const PermissionUpdateSchema = object({
  params: object({
    id: string(),
  }),
  body: object({
    name: string({
      required_error: "Tên quyền là trường bắt buộc",
    }),
    desc: string({
      required_error: "Mô tả là trường bắt buộc",
    }),
    slug: string({
      required_error: "Slug là trường bắt buộc",
    }),
  }),
});

export type PermissionInputCreate = TypeOf<
  typeof PermissionCreateSchema
>["body"];

export type PermissionInputUpdate = TypeOf<typeof PermissionUpdateSchema>;
