import { render } from '@testing-library/react';

import SiteLayouts from './site-layouts';

describe('SiteLayouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SiteLayouts />);
    expect(baseElement).toBeTruthy();
  });
});
