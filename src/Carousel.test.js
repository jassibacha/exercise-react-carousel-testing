import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import TEST_IMAGES from './_testCommon.js';

it('renders without crashing', function () {
    render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// Snapshot Test
it('matches snapshot', function () {
    const { asFragment } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    // expect the first image to show, but not the second
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector('.bi-arrow-right-circle');
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
});

it('works when you click on the left arrow', function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );

    // Move to the second image using the right arrow
    const rightArrow = container.querySelector('.bi-arrow-right-circle');
    fireEvent.click(rightArrow);

    // Expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();

    // Now, move back using the left arrow
    const leftArrow = container.querySelector('.bi-arrow-left-circle');
    fireEvent.click(leftArrow);

    // Expect to be back at the first image
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
        container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
});

it('left arrow is hidden on first image', function () {
    const { container } = render(
        <Carousel photos={TEST_IMAGES} title="images for testing" />
    );
    const leftArrow = container.querySelector('.bi-arrow-left-circle');
    const rightArrow = container.querySelector('.bi-arrow-right-circle');

    // Expect the second image to show, but not the first
    expect(
        container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(leftArrow).not.toBeInTheDocument();

    // Now, move forward using the right arrow
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // Expect to be back at the first image
    expect(
        container.querySelector('img[alt="testing image 3"]')
    ).toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
});
