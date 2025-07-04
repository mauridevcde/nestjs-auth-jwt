import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);


    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (user.role === Role.ADMIN) return true; // si el rol es admin ve todo!

    if (!user || !user.role) {
      return false; // No hay usuario o rol definido
    }

    // Verifica si el rol del usuario está en la lista de roles requeridos
    return requiredRoles.includes(user.role);
    // return user.role === requiredRoles;
  }
}