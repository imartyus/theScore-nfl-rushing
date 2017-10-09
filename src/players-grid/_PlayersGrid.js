import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class PlayersGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: props.rushingData,
        };
        console.log(props)
    }

    filterHandler = event => {
        let filtered = this.props.rushingData.filter(
            el => el.Player.toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.setState({filteredData: filtered})
    };

    render() {
        const inputStyle = {'display': 'inline-block', 'maxWidth': '70%'};
        const dataFormat = [
            {val: "Player", display: "Player"},
            {val: "Team", display: "Team"},
            {val: "Pos", display: "Pos"},
            {val: "Att", display: "Att"},
            {val: "Att/G", display: "Att/G"},
            {val: "Yds", display: "Yards", sort: true},
            {val: "Avg", display: "Avg"},
            {val: "Yds/G", display: "Yds/G"},
            {val: "TD", display: "TD", sort: true},
            {val: "Lng", display: "Lng", sort: true},
            {val: "1st", display: "1st"},
            {val: "1st%", display: "1st%"},
            {val: "20+", display: "20+"},
            {val: "40+", display: "40+"},
            {val: "FUM", display: "FUM"}
        ];

        /****________********_______********________****/

        function makeHead() { // <-- generate table head
            return dataFormat.map(
                (el, idx) =>
                <TableHeaderColumn key={idx} isKey={el.val === 'Player'} dataField={el.val} dataSort={el.sort}>{el.display}</TableHeaderColumn>
            )
        }

        function makeBody(player) {
            return dataFormat.map((el, idx) => <td key={idx}>{player[el.val]}</td>)
        }

        return (
            <section className="container-fluid">
                <BootstrapTable data={this.props.rushingData} striped={true} hover={true}>
                    {makeHead()}
                    {/*<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product*/}
                        {/*ID</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>*/}
                    {/*<TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>*/}
                </BootstrapTable>
            </section>
        );
    }
}

export default PlayersGrid;
