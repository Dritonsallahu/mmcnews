import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { PublisherController } from './controllers/publisher/publisher.controller';

@Module({
  controllers: [AdminController, PublisherController],
  providers: [AdminService]
})
export class AdminModule {}
