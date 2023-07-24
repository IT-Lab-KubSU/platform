import { render } from '@testing-library/react';

import SitePages from './site-pages';

describe('SitePages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SitePages />);
    expect(baseElement).toBeTruthy();
  });
});
