import RoleModel from "@src/models/Role.model";
import RoleRolePermissionModel from "@src/models/RolePermission.model";
import { BadRequestError, ConflictRequestError } from "@src/responses";
import { RoleInputCreate } from "@src/schema";

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

    const RolePermission = new RoleRolePermissionModel();

    // 4
    if (!(await RolePermission.createBulk(permissions))) {
      throw new BadRequestError("Có lỗi xảy ra khi thêm nhiều RolePermission.");
    }

    // 5
    return true;
  };
}

export default RoleService;
