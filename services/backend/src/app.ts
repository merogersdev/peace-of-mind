import express, { Router } from 'express';

import loggerHandler from './middleware/logger.middleware';
import { notFound, errorHandler } from './middleware/error.middleware';

import healthRoutes from './routes/health.routes';
import entryRoutes from './routes/health.routes';
import userRoutes from './routes/user.routes';
import habitRoutes from './routes/habit.routes';

const app = express();
const router = Router();

//--------------------------------------------//
// --- --- --- Express Middleware --- --- --- //
//--------------------------------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-------------------------------------------//
// --- --- --- Custom Middleware --- --- --- //
//-------------------------------------------//

app.use(loggerHandler);

//------------------------------------//
// --- --- --- App Routes --- --- --- //
//------------------------------------//

// Set API Version 2
app.use('/v2', router);

// API Routes
router.use('/health', healthRoutes);
router.use('/entry', entryRoutes);
router.use('/user', userRoutes);
router.use('/habit', habitRoutes);

//----------------------------------------//
// --- --- --- Error Handlers --- --- --- //
//----------------------------------------//

// 404: Not Found
app.use(notFound);

// Main Errors
app.use(errorHandler);

export default app;
