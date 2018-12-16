import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/FoodEntries';
import { Icon, Table, Button, Modal, Form } from 'semantic-ui-react'

class Food extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChangePlace = this.handleChangePlace.bind(this);
        this.handleChangeFood = this.handleChangeFood.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);

        this.state = {
            //show: false,
            valuePlace: '',
            valueFood: '',
            valuePrice: '',
        };
    }

    handleClose() {
        this.props.modalClose();
        //this.setState({ show: false });
    }

    handleShow() {
        console.log("handleShow", this.props);
        this.props.modalShow();
        //this.setState({ show: true });
    }

    handleSave() {
        var data = {
            place: this.state.valuePlace,
            food: this.state.valueFood,
            price: this.state.valuePrice
        }
        var model = JSON.stringify(data);
        this.props.requestCreateFoodEntryType(model);
        console.log("TEST RS", this.props.isCreateFoodEntry);
    }

    handleChangePlace(e) {
        this.setState({ valuePlace: e.target.value });
    }
    handleChangeFood(e) {
        this.setState({ valueFood: e.target.value });
    }
    handleChangePrice(e) {
        this.setState({ valuePrice: e.target.value });
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestFoodEntries(startDateIndex);
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
        this.props.requestFoodEntries(startDateIndex);
    }

    render() {
        console.log("State", this.props.isCreateFoodEntry);
        return (
            <div>
                <h1>Food Entries</h1>
                <p>Registered meals.</p>
                <Button floated='right' onClick={this.handleShow} color="blue"><Icon name="plus" /> New</Button><br />
                {renderEntriesTable(this.props)}
                {renderPagination(this.props)}
                <Modal open={this.props.show && this.props.isCreateFoodEntry !== 2} onClose={this.handleClose}>

                    <Modal.Header>Your Last Meal</Modal.Header>
                    <Modal.Content>
                        <h4>What is the content of the food you eat?</h4>
                        <Form>
                            <Form.Field>
                                <label>Where did you eat?</label>
                                <input placeholder='Enter text' value={this.state.value} onChange={this.handleChangePlace} />
                            </Form.Field>
                            <Form.Field>
                                <label>What did you eat?</label>
                                <input placeholder='Enter text' value={this.state.value} onChange={this.handleChangeFood} />
                            </Form.Field>
                            <Form.Field>
                                <label>How much did you pay?</label>
                                <input placeholder='Enter text' value={this.state.value} onChange={this.handleChangePrice} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button onClick={this.handleSave} color='green'><Icon name="check" /> Save</Button>
                    </Modal.Actions>
                </Modal>

            </div>
        );
    }
}

function renderEntriesTable(props) {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Place</Table.HeaderCell>
                    <Table.HeaderCell>Food</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.entries.map(entry =>
                    <Table.Row key={entry.id}>
                        <Table.Cell>{entry.id}</Table.Cell>
                        <Table.Cell>{entry.place}</Table.Cell>
                        <Table.Cell>{entry.food}</Table.Cell>
                        <Table.Cell>{entry.price}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}

function renderPagination(props) {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return <div className='clearfix text-center'>
        <Button.Group>
            <Button labelPosition='left' icon='left chevron' as={Link} to={`/food/${prevStartDateIndex}`} content='Previous' />
            <Button labelPosition='right' icon='right chevron' as={Link} to={`/food/${nextStartDateIndex}`} content='Next' />
        </Button.Group>
        {props.isLoading ? <span>Loading...</span> : []}
    </div>;
}

export default connect(
    state => state.foodEntries,
    dispatch => bindActionCreators(actionCreators, dispatch),
)(Food);
