import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {

   
    constructor( 
        private readonly authService: AuthService
    ) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    logout() {
        return 'This action logs a user out';
    }
    @Post('register')
    register(@Body()  registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    @Get('forgot-password')
    forgotPassword() {
        return 'This action sends a reset password email';
    }
    @Get('reset-password')
    resetPassword() {
        return 'This action resets a user password';
    }
    @Get('verify-email')
    verifyEmail() { 
        return 'This action verifies a user email';
    }
    @Get('resend-email-verification')
    resendEmailVerification() {
        return 'This action resends a user email verification email';
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: ActiveUserInterface) {
      return this.authService.profile(user);
    }

}
