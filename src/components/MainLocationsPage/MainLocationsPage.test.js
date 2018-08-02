import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow';
import MainLocationsPage from './MainLocationsPage'

test('should render snapshot correctly', () => {
    const renderer = new ShallowRenderer;
    renderer.render(<MainLocationsPage />)
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot()
});