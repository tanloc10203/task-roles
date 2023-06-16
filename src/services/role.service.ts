import RoleModel, { Role } from "@src/models/Role.model";
import RolePermissionModel from "@src/models/RolePermission.model";
import {
  BadRequestError,
  ConflictRequestError,
  NotFoundRequestError,
} from "@src/responses";
import { RoleInputCreate, RoleInputUpdate } from "@src/schema";

class RoleService {
  static create = async (data: RoleInputCreate) => {
    /**
      1. Kiểm tra xem tên vai trò có tồn tại chưa.
      2. Tạo vai trò này.
      3. Duyệt qua mảng permissions. Tạo ra mảng mới.
      4. Tạo permissionRole cho vai trò nay.
      5. Trả kết quả.
     */
    const Role = new RoleModel();

    // 1.
    if (await Role.findOne({ name: data.name })) {
      throw new ConflictRequestError("Tên vai trò đã tồn tại...");
    }

    // 2.
    const roleId = await Role.create({ name: data.name, desc: data.desc });

    // 3.
    const permissions = data.permissions.map((p) => [roleId, p]);
    /**
      roleId = 1;
      permissions = [1,2,3,4,5] => [[1,1], [1,2], [1,3], [1,4], [1,5]];
     */

    const RolePermission = new RolePermissionModel();

    // 4
    if (!(await RolePermission.createBulk(permissions))) {
      throw new BadRequestError("Có lỗi xảy ra khi thêm nhiều RolePermission.");
    }

    // 5
    return true;
  };

  static updateById = async (data: RoleInputUpdate["body"], id: number) => {
    /**
      1. Kiểm tra xem tên vai trò có tồn tại ở vai trò khác không.
      2. Cập nhật lại vai trò
      3. Xóa all quyền theo id của vai trò
      4. Để cập nhật lại quyền. => Tạo lại quyền
      5. Trả kết quả.
     */
    const Role = new RoleModel();

    let roleFind = await Role.findOne<Role>({ name: data.name });

    // 1.
    if (roleFind && roleFind.id !== id) {
      throw new ConflictRequestError(
        "Tên vai trò đã tồn tại ở vai trò khác..."
      );
    }

    // 2.
    if (!(await Role.updateById({ name: data.name, desc: data.desc }, id))) {
      throw new NotFoundRequestError(
        `Có lỗi xảy ra khi cập nhật vai trò. (Không tìm thấy id = \`${id}\`)`
      );
    }

    const RolePermission = new RolePermissionModel();

    // 3.
    if (!(await RolePermission.delete({ role_id: id }))) {
      throw new BadRequestError(`Có lỗi xảy ra khi xóa quyền`);
    }

    const permissions = data.permissions.map((p) => [id, p]);
    /**
      roleId = 1;
      permissions = [1,2,3,4,5] => [[1,1], [1,2], [1,3], [1,4], [1,5]];
     */

    // 4
    if (!(await RolePermission.createBulk(permissions))) {
      throw new BadRequestError("Có lỗi xảy ra khi thêm nhiều RolePermission.");
    }

    // 5
    return true;
  };

  static getRoleById = async (id: number) => {
    const Role = new RoleModel();

    const result = await Role.findOne<Role>(
      { id: id },
      "-created_at -updated_at"
    );

    if (!result) {
      throw new NotFoundRequestError(`Không tìm thấy role bởi id = \`${id}\``);
    }

    return {
      ...result,
      permissions: await Role.getPermission(result.id as number),
    };
  };

  static getAll = async (filters = {}) => {
    const Role = new RoleModel();

    const result = await Role.findAll<Role>(filters);

    if (!result.length) return [];

    const newResult = result.map(
      (p) =>
        new Promise(async (resolve) => {
          const permissions = await Role.getPermission(p.id as number);
          resolve({ ...p, permissions });
        })
    );

    return await Promise.all(newResult);
  };
}

export default RoleService;
