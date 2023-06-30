import { Router } from 'express';
const router = Router();

// Controllers
import dashboardController from '../controllers/dashboard.controller';

// Routes
router.get('/', dashboardController.getDashboardData);

export default router;
