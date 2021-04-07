import * as M from '@material-ui/core';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

interface SelectorProps<TOption extends string> {
  currentSelection: TOption;
  setSelection: Dispatch<SetStateAction<TOption>>;
  options: Array<TOption>;
}

function SelectionButton<TOption extends string>(
  props: SelectorProps<TOption> & { children: TOption },
) {
  const variant =
    props.currentSelection === props.children ? 'contained' : 'outlined';
  return (
    <M.Button
      style={{ marginRight: 5 }}
      variant={variant}
      color="secondary"
      onClick={() => props.setSelection(props.children)}
    >
      {props.children.toUpperCase()}
    </M.Button>
  );
}

export default function Selector<TOption extends string>(
  props: SelectorProps<TOption>,
): JSX.Element {
  return (
    <>
      {props.options.map((option, index) => (
        <SelectionButton key={option + index} {...props}>
          {option}
        </SelectionButton>
      ))}
    </>
  );
}
