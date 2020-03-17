import { ServerIndicator } from './server-indicator.service';

describe('ServerIndicator', () => {
  describe('check', () => {
    it('should return status up', async () => {
      const serverIndicator = new ServerIndicator();
      const returned = serverIndicator.check('server');
      expect(returned).hasOwnProperty('server');
      expect(returned.server.status).toEqual('up');
      expect(returned.server.version).toBeDefined();
      expect(returned.server.utc).toBeDefined();
      expect(returned.server.local).toBeDefined();
    });
  });
});
