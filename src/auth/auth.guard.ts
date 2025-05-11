import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: jwtConstants.secret },
            );
            request['user'] = payload;
        }catch (error) {
            throw new UnauthorizedException('Token is invalid or expired');
        }
        return true;
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ')??[];
        return type === 'Bearer' ? token : undefined;
    }

}


// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
//     ForbiddenException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { Request } from 'express';
// import { Reflector } from '@nestjs/core';
// import { AuthService } from './auth.service'; // Supposons que vous avez un AuthService

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(
//         private readonly jwtService: JwtService,
//         private readonly reflector: Reflector,
//         private readonly authService: AuthService, // Pour récupérer les rôles de l'utilisateur
//     ) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);
        
//         if (!token) {
//             throw new UnauthorizedException('Token not found');
//         }

//         let payload;
//         try {
//             payload = await this.jwtService.verifyAsync(
//                 token,
//                 { secret: jwtConstants.secret },
//             );
//         } catch (error) {
//             throw new UnauthorizedException('Token is invalid or expired');
//         }

//         // Récupérer l'utilisateur complet avec ses rôles depuis la base de données
//         const user = await this.authService.findUserWithRoles(payload.sub);
//         if (!user || !user.is_active) {
//             throw new UnauthorizedException('User not found or inactive');
//         }

//         // Attacher l'utilisateur et ses rôles à la requête
//         request.user = {
//             id: user.id,
//             email: user.email,
//             roles: user.roles.map(userRole => userRole.role.nom),
//         };

//         // Vérification des rôles requis
//         return this.checkRoles(context, request.user.roles);
//     }

//     private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//     }

//     private checkRoles(context: ExecutionContext, userRoles: string[]): boolean {
//         const requiredRoles = this.reflector.get<string[]>(
//             'roles',
//             context.getHandler(),
//         ) || this.reflector.get<string[]>(
//             'roles',
//             context.getClass(),
//         );

//         // Si aucune restriction de rôle, on autorise
//         if (!requiredRoles) {
//             return true;
//         }

//         // Vérifier si l'utilisateur a au moins un des rôles requis
//         const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
        
//         if (!hasRequiredRole) {
//             throw new ForbiddenException(
//                 `You need one of these roles: ${requiredRoles.join(', ')}`,
//             );
//         }

//         return true;
//     }
// }