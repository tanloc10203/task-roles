import { array, number, object, string, TypeOf } from "zod";

export const UserCreateSchema = object({
  body: object({
    display_name: string({
      required_error: "Tên hiển thị là trường bắt buộc",
    }),
    username: string({
      required_error: "Tài khoản trường bắt buộc",
    }),
    password: string({
      required_error: "Mật khẩu là trường bắt buộc",
    }),
    roles: number({
      required_error: "Roles là 1 array bắt buộc",
    })
      .array()
      .nonempty({
        message: "Roles là 1 array không rỗng.",
      }),
  }),
});

export const UserUpdateSchema = object({
  params: object({
    id: string({
      required_error: "Params id trường bắt buộc",
    }),
  }),
  body: object({
    display_name: string({
      required_error: "Tên hiển thị là trường bắt buộc",
    }),
    username: string({
      required_error: "Tài khoản trường bắt buộc",
    }),
    roles: number({
      required_error: "Roles là 1 array bắt buộc",
    })
      .array()
      .nonempty({
        message: "Roles là 1 array không rỗng.",
      }),
  }),
});

export type UserInputCreate = TypeOf<typeof UserCreateSchema>["body"];
export type UserInputUpdate = TypeOf<typeof UserUpdateSchema>;
