import { array, number, object, string, TypeOf } from "zod";

export const RoleCreateSchema = object({
  body: object({
    name: string({
      required_error: "Tên vai trò là trường bắt buộc",
    }),
    desc: string({
      required_error: "Mô tả là trường bắt buộc",
    }),
    permissions: number({
      required_error: "Permissions là 1 array bắt buộc",
    })
      .array()
      .nonempty({
        message: "Permissions là 1 array không rỗng.",
      }),
  }),
});

export type RoleInputCreate = TypeOf<typeof RoleCreateSchema>["body"];
