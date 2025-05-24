import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Role } from 'src/auth/entities/role.entity';
import { UserRole } from 'src/auth/entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Auth)
        private userRepository: Repository<Auth>,
        @InjectRepository(UserRole)
        private userRoleRepository: Repository<UserRole>,
    ){}


    async createRole(name: string): Promise<Role> {
        const role = this.roleRepository.create({ nom: name });
        return this.roleRepository.save(role);
    }

    async assignRoleToUser(userId: number, roleName: string): Promise<Auth> {
        const user = await this.userRepository.findOne({ where: {id: userId},  relations: ['roles', 'roles.role'] });
        if(!user) throw new Error("Utilisateur non trouvé");

        let role = await this.roleRepository.findOne({ where: { nom: roleName } });
        if(!role) {
            role = await this.createRole(roleName);
        }

        const hasRole = user.roles.some(userRole => userRole.role.nom === roleName);
        if(!hasRole){
            const userRole = this.userRoleRepository.create({ user, role });
            await this.userRoleRepository.save(userRole);
        }

        return this.userRepository.findOne({ where: {id: userId}, relations: ['roles', 'roles.role'] });
    }


    async removeRoleFromUser(userId: number, roleNom: string): Promise<Auth> {
        const userRole = await this.userRoleRepository
            .createQueryBuilder('userRole')
            .leftJoinAndSelect('userRole.user', 'user')
            .leftJoinAndSelect('userRole.role', 'role')
            .where('user.id = :userId', { userId })
            .andWhere('role.nom = :roleNom', { roleNom })
            .getOne();

        if (userRole) {
            await this.userRoleRepository.remove(userRole);
        }

        return this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.role']
        });
    }

    async getUserWithRoles(userId: number): Promise<Auth> {
        return this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.role']
        });
    }

    async getUserRoles(userId: number): Promise<Role[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.role']
        });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        return user.roles.map(userRole => userRole.role);
    }
}
