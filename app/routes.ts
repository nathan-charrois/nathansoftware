import { route, type RouteConfig } from '@react-router/dev/routes'

export default [
  route('/', 'routes/Home/home.tsx'),
  route('/diet', 'routes/Diet/index.tsx'),
] satisfies RouteConfig
