import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../../src/films/controllers/films.controller';
import { FilmsService } from '../../src/films/services/films.service';

const mockFilmsService = {
  getAll: jest.fn(),
  getSchedule: jest.fn(),
};

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call filmsService.getAll', async () => {
      const result = [{ id: 1, title: 'Test Film' }];
      mockFilmsService.getAll.mockResolvedValue(result);

      const response = await controller.getAll();

      expect(service.getAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });

  describe('getSchedule', () => {
    it('should call filmsService.getSchedule with the correct id', async () => {
      const id = '1';
      const result = { items: [{ id: 1, datetime: '2023-10-27T10:00:00Z' }] };
      mockFilmsService.getSchedule.mockResolvedValue(result);

      const response = await controller.getSchedule(id);

      expect(service.getSchedule).toHaveBeenCalledWith(id);
      expect(response).toBe(result);
    });
  });
});
