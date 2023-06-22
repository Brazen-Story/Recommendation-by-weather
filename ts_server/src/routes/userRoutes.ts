import { Router } from 'express';

import {
  createUser,
  loginUser,
  loginSuccess,
  loginKeep,
  logoutUser,
  ManagerUserList,
} from '../controllers/authController';

export const userRoutes: Router = Router();

userRoutes.post('/create', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/success', loginSuccess);
userRoutes.get('/Reissuance', loginKeep);
userRoutes.post('/logout', logoutUser);
userRoutes.get('/user/manager', ManagerUserList);
