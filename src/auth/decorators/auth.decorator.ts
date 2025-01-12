import { applyDecorators } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { Roles } from './roles.decorator';  
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role:Role) {
    return applyDecorators(
         Roles(role),
         UseGuards(AuthGuard, RolesGuard)
    );
}