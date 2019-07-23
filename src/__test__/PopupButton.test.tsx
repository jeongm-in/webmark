import React from 'react';
import PopupButton from '../components/PopupButton';
import renderer from 'react-test-renderer';
import { saveClicked } from '../utils'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <PopupButton id="save" text="Save" onClick={saveClicked} />
    )
    .toJSON()!;
  expect(tree).toMatchSnapshot();
});

it('stays the same after the click', () => {
  const tree = renderer
    .create(
      <PopupButton id="save" text="Save" onClick={saveClicked} />
    )
    .toJSON()!;
  expect(tree).toMatchSnapshot();

  tree.props.onClick();
  expect(tree).toMatchSnapshot();
});

it('correctly calls onClick as many times it is clicked', () => {
  const m = jest.fn();
  const saveButton = renderer.create(
    <PopupButton id="save" text="Save" onClick={m} />
  );
  let tree = saveButton.toJSON()!;
  expect(tree).toMatchSnapshot();

  for (let i = 0; i < 5; ++i) {
    tree.props.onClick();
  }
  expect(m.mock.calls.length).toBe(5);
});
