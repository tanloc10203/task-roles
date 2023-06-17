import { Role } from "@src/models/Role.model";
import UserModel, { User } from "@src/models/User.model";
import UserRolesModel from "@src/models/UserRole.model";
import {
  BadRequestError,
  ConflictRequestError,
  ForbiddenRequestError,
  NotFoundRequestError,
} from "@src/responses";
import { UserInputCreate, UserInputUpdate } from "@src/schema";
import { hashPassword } from "@src/utils";

class UserService {
  static create = async (data: UserInputCreate) => {
    /**
      1. Kiểm tra xem tài khoản (username) có tồn tại chưa.
      2. Hash Password
      3. Tạo người dùng. Sau khi tạo => userID.
      4. Duyệt qua array roles => [['user_id', 'role_id'], ...]
      5. Thêm vai trò cho người dùng này.
      6. Trả về kết quả.
     */
    const User = new UserModel();

    // 1.
    if (await User.findOne({ username: data.username })) {
      throw new ConflictRequestError("Tài khoản đã tồn tại...");
    }

    // 2.
    const passwordHash = await hashPassword(data.password);

    // 3.
    const { password, roles, ...inserts } = data;

    const userId = await User.create({ ...inserts, password: passwordHash });

    // 4
    const rolesInsert = data.roles.map((r) => [userId, r]);

    const UserRoles = new UserRolesModel();

    // 5
    if (!(await UserRoles.createBulk(rolesInsert))) {
      throw new BadRequestError("Có lỗi xảy ra khi thêm nhiều UserRoles.");
    }

    // 6
    return await UserService.getUserById(userId);
  };

  static updateById = async (data: UserInputUpdate["body"], id: number) => {
    /**
      1. Kiểm tra xem tài khoản (username) có tồn tại ở tài khoản không
      2. Cập nhật người dùng. Sau khi tạo => userID.
      3. Xóa all các vai trò người dùng này.
      4. Duyệt qua array roles => [['user_id', 'role_id'], ...]
      5. Thêm vai trò cho người dùng này.
      6. Trả về kết quả.
     */
    const User = new UserModel();

    let user = await User.findOne<Role>({ username: data.username });

    // 1.
    if (user && user.id !== id) {
      throw new ConflictRequestError(
        "Tài khoản đã tồn tại ở người dùng khác..."
      );
    }

    // 2.
    if (
      !(await User.updateById(
        { display_name: data.display_name, username: data.username },
        id
      ))
    ) {
      throw new NotFoundRequestError(
        `Có lỗi xảy ra khi cập nhật người dùng. (Không tìm thấy id = \`${id}\`)`
      );
    }

    const UserRoles = new UserRolesModel();

    // 3.
    if (!(await UserRoles.delete({ user_id: id }))) {
      throw new BadRequestError(
        `Có lỗi xảy ra khi xóa nhiều vai trò của người dùng.`
      );
    }

    // 4
    const roles = data.roles.map((r) => [id, r]);

    // 5
    if (!(await UserRoles.createBulk(roles))) {
      throw new BadRequestError("Có lỗi xảy ra khi thêm nhiều UserRoles.");
    }

    // 6
    return true;
  };

  static getUserById = async (id: number) => {
    const User = new UserModel();

    const result = await User.findOne<User>({ id: id }, "-password");

    if (!result) {
      throw new NotFoundRequestError(`Không tìm thấy User bởi id = \`${id}\``);
    }

    return {
      ...result,
      roles: await User.getRoles(result.id as number),
    };
  };

  static getAll = async (filters = {}) => {
    const User = new UserModel();

    const result = await User.findAll<User>(filters, "-password");

    if (!result.length) return [];

    const newResult = result.map(
      (p) =>
        new Promise(async (resolve) => {
          const roles = await User.getRoles(p.id as number);
          resolve({ ...p, roles });
        })
    );

    return await Promise.all(newResult);
  };

  static deleteById = async (id: number, isDelete = false) => {
    /**
      1. Kiểm tra xem người dùng này có ràng buộc đến 1 vai trò nào không.
      2. Nếu không => được phép xóa.
      3. Nếu có => không được phép.
      4. Muôn xóa phải thông qua admin duyệt thì mới được xóa. 
      VD: query ? isDelete=true. => Xóa người dùng này.
     */
    const User = new UserModel();

    if (isDelete) {
      // 4
      const UserRoles = new UserRolesModel();

      // 3.
      if (!(await UserRoles.delete({ user_id: id }))) {
        throw new BadRequestError(
          `Có lỗi xảy ra khi xóa nhiều vai trò của người dùng.`
        );
      }

      if (!(await User.deleteById(id))) {
        throw new BadRequestError(
          `Có lỗi xảy ra khi xóa người dùng. (Không tìm thấy id = \`${id}\`)`
        );
      }

      return true;
    }

    // 1
    const findUserRoles = await User.getRoles(id);

    if (findUserRoles.length) {
      throw new ForbiddenRequestError("Không được phép xóa người dùng."); // 3.
    } else {
      // 2
      if (!(await User.deleteById(id))) {
        throw new BadRequestError(
          `Có lỗi xảy ra khi xóa người dùng. (Không tìm thấy id = \`${id}\`)`
        );
      }

      return true;
    }
  };
}

export default UserService;
