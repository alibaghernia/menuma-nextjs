import React, { useEffect, useMemo } from 'react';
import { IAdvancedSearch } from './types';
import {
  Form,
  Input,
  InputNumber,
  Grid,
  Switch,
  Button,
  Row,
  Col,
} from 'antd/lib';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';
import _ from 'lodash';
import { LinedCloseIcon } from '@/icons/lined_close';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const AdvancedSearch: IAdvancedSearch = (props) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const breakpoints = Grid.useBreakpoint();
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  const currentBreakpoint = useMemo(
    () =>
      Object.entries(breakpoints)
        .filter(([, v]) => !!v)
        .map(([k]) => k),
    [breakpoints],
  );

  function onFinish(data: any) {
    const validData = _(data)
      .omitBy((v) => !!!v)
      .value();
    props.onSearch?.(validData);
  }

  const renderTextFields = useMemo(() => {
    const fields = props.fields.filter((field) => field.type == 'text');
    if (!fields.length) return <></>;
    return fields.map((field, idx) => {
      return (
        <Form.Item key={idx} label={field.title} name={field.name}>
          <Input placeholder={field.placeholder} />
        </Form.Item>
      );
    });
  }, []);
  const renderNumberFields = useMemo(() => {
    const fields = props.fields.filter((field) => field.type == 'number');
    if (!fields.length) return <></>;
    return fields.map((field, idx) => {
      return (
        <Form.Item key={idx} label={field.title} name={field.name}>
          <InputNumber className="!w-full" placeholder={field.placeholder} />
        </Form.Item>
      );
    });
  }, []);
  const renderCheckFields = useMemo(() => {
    const fields = props.fields.filter((field) => field.type == 'check');
    if (!fields.length) return <></>;
    return (
      <Row align="middle">
        {fields.map((field, idx) => {
          return (
            <Col className="gutter-row" key={idx} span={8}>
              <Form.Item label={field.title} name={field.name} className="!m-0">
                <Switch />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    );
  }, [currentBreakpoint]);

  const _form = useMemo(
    () => (
      <Form form={form} onFinish={onFinish} layout="vertical">
        {renderTextFields}
        {renderNumberFields}
        {renderCheckFields}
      </Form>
    ),
    [props.fields],
  );
  const component = useMemo(() => {
    if (props.float) {
      return (
        <>
          <div
            className={twMerge(
              classNames(
                'fixed inset-0 bg-black/[.2] transition-opacity duration-[.3s]',
                {
                  'opacity-0 pointer-events-none': !props.open,
                },
              ),
            )}
            onClick={() => props.onClose?.()}
          ></div>
          <FlexBox
            direction="column"
            gap={2}
            className={twMerge(
              classNames(
                'fixed bg-white z-10 p-[1rem] px-[1.5rem] rounded-[.862rem] max-h-[90vh]',
                {
                  'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[20rem]':
                    currentBreakpoint.includes('sm'),
                  hidden: currentBreakpoint.includes('sm') && !props.open,
                  'w-full pb-[2rem] transition-all duration-[.3s] bottom-0':
                    currentBreakpoint.includes('xs'),
                  'bottom-[-100%]':
                    currentBreakpoint.includes('xs') && !props.open,
                },
              ),
            )}
          >
            <FlexItem className="border-b pb-2">
              <FlexBox className="w-full" justify="between" alignItems="center">
                <FlexItem className="text-typography text-[1rem] font-bold">
                  جستحوی پیشرفته
                </FlexItem>
                <FlexItem>
                  {currentBreakpoint.includes('xs') && (
                    <LinedCloseIcon
                      color={resolvedTailwindConfig.theme?.colors![
                        'typography'
                      ].toString()}
                      onClick={() => props.onClose?.()}
                      className="cursor-pointer"
                    />
                  )}
                </FlexItem>
              </FlexBox>
            </FlexItem>
            <FlexItem className="overflow-y-auto py-[.5rem]">{_form}</FlexItem>
            <FlexItem>
              <FlexBox
                justify={
                  currentBreakpoint.includes('sm') ? 'between' : 'normal'
                }
                alignItems="center"
                gap={2}
              >
                <FlexItem grow>
                  <Button
                    block
                    type="primary"
                    onClick={() => form.submit()}
                    loading={props.loading}
                  >
                    جستجو
                  </Button>
                </FlexItem>
                {props.onClose && (
                  <FlexItem>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => props.onClose?.()}
                    >
                      بی خیال
                    </Button>
                  </FlexItem>
                )}
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </>
      );
    } else {
    }
  }, [props.float, currentBreakpoint, props.open]);

  return (
    <div
      className={twMerge(
        classNames(
          'z-50 fixed inset-0',
          { 'pointer-events-none': !props.open },
          props.className,
        ),
      )}
    >
      {component}
    </div>
  );
};

export default AdvancedSearch;
