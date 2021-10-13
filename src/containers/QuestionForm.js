import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Hoc from '../hoc/hoc';


const QuestionForm = (props) => {

    
    return (
        <Hoc>
            <Form.Item label="Question: "  name={["question", `${props.id}`]} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: "Please input a question" }]} >
                <Input placeholder="Question choice" />
            </Form.Item>

            <Form.Item label="Answer: " name={["answers", `${props.id}`]} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: "Please input an answer to this question" }]} >
                <Input placeholder="Answer choice" />
            </Form.Item>

            <Form.List
                name={["choices", `${props.id}`]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>

                        {fields.map((field, index) => (
                            <Form.Item
                                label={index === 0 ? 'Choices' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}

                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input a choice to the question",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="passenger name" style={{ width: '60%' }} />
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
                                Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>

        </Hoc>
    );
};

export default QuestionForm