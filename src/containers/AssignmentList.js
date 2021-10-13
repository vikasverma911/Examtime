import React from "react";
import { connect } from "react-redux";
import { Card, Loader } from 'semantic-ui-react'
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { Link } from "react-router-dom";


class AssignmentList extends React.PureComponent {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTS(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getASNTS(newProps.token);
            }
        }
    }

    renderItem(item) {
        return (
            <Card.Group>
                {item.map((card) => (
                        <Card
                        link color={"blue"} as={Link} to={`/assignments/${card.id}`}
                            key = {card.id}
                            header = {card.teacher}
                            description={card.title}
                        />
                ))}
            </Card.Group>
        );
    }

    render() {
        console.log(this.props.assignments)
        return (
            <Hoc>
                {
                    this.props.loading ?
                    (<Loader active inline='centered' />) : (this.renderItem(this.props.assignments))
                }
            </Hoc>   
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        assignments: state.assignments.assignments,
        loading: state.assignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTS: token => dispatch(actions.getASNTS(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentList);