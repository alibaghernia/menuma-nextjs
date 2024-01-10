import React from 'react';
import { ISection } from './types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';

const Section: ISection = ({ children, ...props }) => {
  return (
    <FlexBox
      direction="column"
      gap={'.5rem'}
      className={twMerge(props.className)}
      id={props.id}
    >
      <FlexItem>
        <FlexBox
          gap={2}
          alignItems="center"
          justify="between"
          className="px-[1.9rem]"
        >
          <FlexItem
            grow={false}
            className="text-[1rem] text-typography w-fit whitespace-nowrap font-bold"
          >
            {props.title}
          </FlexItem>
          <FlexItem grow>
            <hr className="border-black/10 w-full" />
          </FlexItem>
          {props.append && (
            <FlexItem grow={false} className="w-fit">
              {props.append}
            </FlexItem>
          )}
        </FlexBox>
      </FlexItem>
      <FlexItem className={classNames(props.contentClassNames)}>
        {children}
      </FlexItem>
    </FlexBox>
  );
};

const AppentRegularButton: ISection['AppentRegularButton'] = (props) => {
  return (
    <div
      className="text-more whitespace-nowrap text-[1rem] font-bold cursor-pointer"
      onClick={props.onClick}
    >
      مشاهده همه
    </div>
  );
};

Section.AppentRegularButton = AppentRegularButton;

export { Section };
