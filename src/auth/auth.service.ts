import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
       private readonly usersService: UsersService,
       private readonly jwtService: JwtService      
    ) {}

    async login({email, password}: LoginDto) {
        const user= await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException("Invalid credentials. Wrong email");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials. Wrong password");
        }
        if (!user.active) {
            throw new UnauthorizedException("User is inactive");
        }
        if (user.deleted_at) {
            throw new UnauthorizedException("User is deleted");
        }
        const payload = { email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        
        return {
            message: "Login successful",
            token,
            email
        };
    }

    async logout() {
        return 'This action logs a user out';
    }

    async register({ firstname, lastname, password, email }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
          throw new BadRequestException("Email already exists");
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10);
    
        await this.usersService.create({
          firstname,
          lastname,
          email,
          password: hashedPassword,
        });
    
        return {
          message: "User created successfully",
        };
    }

    async forgotPassword() {
        return 'This action sends a reset password email';
    }

    async resetPassword() {
        return 'This action resets a user password';
    }

    async verifyEmail() {
        return 'This action verifies a user email';
    }

    async resendEmailVerification() {
        return 'This action resends a user email verification email';
    } 

    async profile(user) {
        return await this.usersService.findOneByEmail(user.email);
    }      
}
