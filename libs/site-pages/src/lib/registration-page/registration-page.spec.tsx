import { render } from '@testing-library/react';

import RegistrationPage from './registration-page';

describe('RegistrationPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationPage />);
    expect(baseElement).toBeTruthy();
  });
});
