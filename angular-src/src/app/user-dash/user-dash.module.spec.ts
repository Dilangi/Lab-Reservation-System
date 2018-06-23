import { UserDashModule } from './user-dash.module';

describe('UserDashModule', () => {
  let userDashModule: UserDashModule;

  beforeEach(() => {
    userDashModule = new UserDashModule();
  });

  it('should create an instance', () => {
    expect(userDashModule).toBeTruthy();
  });
});
