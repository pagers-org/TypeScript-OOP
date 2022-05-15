import { MENU } from '@/modules/menu/constant';

export type MenuType = typeof MENU[keyof typeof MENU];
