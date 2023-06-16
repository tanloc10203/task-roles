import { Permission } from "@src/models";
import PermissionModel from "@src/models/Permission.model";
import { BadRequestError, ConflictRequestError } from "@src/responses";
import {
  PermissionInputCreate,
  PermissionInputUpdate,
} from "@src/schema/permission.schema";

class PermissionService {
  static create = async (data: PermissionInputCreate) => {
    const permissionModel = new PermissionModel();

    // tìm tên quyền có tồn tại chưa.
    if (
      await permissionModel.findOne<Permission>({
        name: data.name,
      })
    ) {
      throw new ConflictRequestError("Tên quyền đã tồn tại...");
    }

    // tìm slug có tồn tại chưa
    if (await permissionModel.findOne<Permission>({ slug: data.slug })) {
      throw new ConflictRequestError("Slug đã tồn tại...");
    }

    return await permissionModel.create(data);
  };

  static update = async (data: PermissionInputUpdate["body"], id: number) => {
    const permissionModel = new PermissionModel();

    let permission = await permissionModel.findOne<Permission>({
      name: data.name,
    });

    // tìm tên quyền có tồn tại chưa.
    if (permission && permission.id !== id) {
      throw new ConflictRequestError("Tên quyền đã tồn tại...");
    }

    permission = await permissionModel.findOne<Permission>({
      slug: data.slug,
    });

    // tìm slug có tồn tại chưa
    if (permission && permission.id !== id) {
      throw new ConflictRequestError("Slug đã tồn tại...");
    }

    if (!(await permissionModel.updateById(data, id))) {
      throw new BadRequestError(
        `Có lỗi xảy ra khi cập nhật quyền. Không tìm thấy id = ${id}`
      );
    }

    return true;
  };

  static getAll = async (filters: {}) => {
    const permissionModel = new PermissionModel();

    return await permissionModel.findAll<Permission>(filters);
  };

  static deleteById = async (id: number) => {
    const permissionModel = new PermissionModel();

    if (!(await permissionModel.deleteById(id))) {
      throw new BadRequestError(
        `Có lỗi xảy ra khi xóa quyền. Không tìm thấy id = ${id}`
      );
    }

    return true;
  };
}

export default PermissionService;
