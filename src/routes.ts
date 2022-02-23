import { IRouterConfig, lazy } from 'ice';

const Home = lazy(() => import('@/pages/Gushiwen'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: Home,
  },
];

export default routerConfig;
