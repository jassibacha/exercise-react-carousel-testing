import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

// Smoke Test
it('renders without crashing', function () {
    render(
        <Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={5} />
    );
});

// Snapshot Test
it('matches snapshot', function () {
    const { asFragment } = render(
        <Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={5} />
    );
    expect(asFragment()).toMatchSnapshot();
});
