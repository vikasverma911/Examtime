import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import Hoc from "../hoc/hoc";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const QuestionForm = (props) => {
    return (
        <Hoc>
            <Form.Item label={"Question: "} name={["questions", `${props.id}`]} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: "Please enter a valid question" }]} >
                <Input placeholder="Add a Question" />
            </Form.Item>
            <Form.Item label={"Correct Answer: "} name={["answers", `${props.id}`]} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: "Please input a correct ans" }]} >
                <Input placeholder="Add a Answer" />
            </Form.Item>
            <Form.List
                name={["choices", `${props.id}`]}
                validateTrigger={['resetField']}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Choices' : ''}
                                required={false}
                                key={`ccc[${props.id}][${field.key}]`}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input valid choices.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Enter a choice" style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add an option
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Hoc>
    );
};
export default QuestionForm;