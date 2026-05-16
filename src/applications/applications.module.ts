import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Position } from '../positions/entities/position.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Position]),
    MailModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [TypeOrmModule],
})
export class ApplicationsModule {}