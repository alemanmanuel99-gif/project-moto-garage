import { Router } from 'express';
import { createGarageItem, deleteGarageItem, getGarageItems } from '../controllers/garage.js';

const garageRouter = Router();

garageRouter.get('/', getGarageItems);
garageRouter.post('/', createGarageItem);
garageRouter.delete('/:id', deleteGarageItem);

export { garageRouter };
