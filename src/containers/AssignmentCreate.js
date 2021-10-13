import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Divider } from "antd";
import QuestionForm from "./QuestionForm";
import Hoc from "../hoc/hoc";
import { createASNT } from "../store/actions/assignments";
import { CloseOutlined } from '@ant-design/icons';


function AssignmentCreate(props) {

    const [formCount, setFormCount] = useState(0);

    const remove = () => {
        setFormCount(formCount - 1)
    };

    const add = () => {
        setFormCount(formCount + 1)
    };


    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log(values.question)
        const questions = [];
        for (let i = 0; i < values.length; i += 1) {
            questions.push({
                title: values.question[i],
                choices: values.questions[i].choices.filter(el => el !== null),
                answer: values.answers[i]
            });
        }
        const asnt = {
            teacher: props.username,
            title: values.title,
            questions
        };
        // props.createASNT(props.token, asnt);
    };  

    const questions = [];
    for (let i = 0; i < formCount; i += 1) {
        questions.push(
            <Hoc key={i}>
                {questions.length > 0 ? (
                    <CloseOutlined
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={questions.length === 0}
                        onClick={() => remove()}
                    />
                ) : null}
                <QuestionForm id={i} {...props} />
                <Divider />
            </Hoc>
        );
    }

    return (

        <Form onFinish={onFinish} >
            <h1>Create an assignment</h1>

            <Form.Item label={"Title: "} name={`title`} validateTrigger={['onChange', 'onBlur']} rules={[{ required: true, message: "Please input a title" }]} >
                <Input placeholder="Add a title" />
            </Form.Item>

            {questions}

            <Form.Item>
                <Button type="secondary" onClick={add}>
                    <CloseOutlined type="plus" /> Add question
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        loading: state.assignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentCreate);
