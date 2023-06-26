import { Router } from 'express';

import {
  sign,
  login,
  loginSuccessfully,
  logout,
  managerUserList,
  maintainLogged,
} from '../controllers/authController';

export const userRoutes: Router = Router();

userRoutes.post('/create', sign);
userRoutes.post('/login', login);
userRoutes.get('/success', loginSuccessfully);
userRoutes.get('/Reissuance', maintainLogged);
userRoutes.post('/logout', logout);
userRoutes.get('/user/manager', managerUserList);
