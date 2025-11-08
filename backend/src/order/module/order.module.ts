import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
