import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 API en http://localhost:${env.PORT}`);
});
