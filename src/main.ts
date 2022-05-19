import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderView } from './views/order.view';

const app = new OrderController(new OrderService(), new OrderView());
