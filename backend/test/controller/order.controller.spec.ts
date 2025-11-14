import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../src/order/controllers/order.controller';
import { OrderService } from '../../src/order/services/order.service';
import {
  CreateOrderDto,
  CreateTicketDto,
} from '../../src/order/dto/create-order.dto';

const mockOrderService = {
  createOrder: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should call orderService.createOrder with the correct DTO', async () => {
      const ticketDto: CreateTicketDto = {
        film: 'Film Title',
        session: 'Session ID or Time',
        row: 5,
        seat: 10,
      };

      const dto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '+71234567890',
        tickets: [ticketDto],
      };

      const result = { id: 'generated-order-id', ...dto, status: 'confirmed' };
      mockOrderService.createOrder.mockResolvedValue(result);

      const response = await controller.createOrder(dto);

      expect(service.createOrder).toHaveBeenCalledWith(dto);
      expect(response).toBe(result);
    });
  });
});
