import React from 'react';
import LocationsList from './LocationsList'
import { detailedListItem, simpleListItem } from './listHelper';
import ShallowRenderer from 'react-test-renderer/shallow'
// const detailedListItem = jest.fn()

jest.mock('./listHelper', () => {
    return {
        detailedListItem: jest.fn(),
        simpleListItem: jest.fn()
    }
})

test('detailedListItem() should be called when props.detailed is true ', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={true} />)
    const result = renderer.getRenderOutput()

    result.props.children.props.renderItem()

    expect(detailedListItem).toBeCalled()
});

test('simpleListItem() should be called when props.detailed is false ', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={false} />)
    const result = renderer.getRenderOutput()

    result.props.children.props.renderItem()

    expect(simpleListItem).toBeCalled()
});

test('props.detailed false snapshot test', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={false} />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
})

test('props.detailed true snapshot test', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={true} />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
})