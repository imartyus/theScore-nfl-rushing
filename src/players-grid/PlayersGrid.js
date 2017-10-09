import React, {Component} from 'react';
import {CSVLink} from 'react-csv';

class PlayersGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: props.rushingData,
            sortName: 'Yds',
            sortDesc: true
        };
        // console.log(props)
    }

    filterHandler = event => {
        let filtered = this.props.rushingData.filter(
            el => el.Player.toLowerCase().includes(event.target.value.toLowerCase())
        );
        this.setState({filteredData: filtered})
    };

    sortHandler = (element) => {
        // console.log(element);
        if (element.sort) {
            if (element.val === this.state.sortName) {
                this.setState({sortDesc: !this.state.sortDesc})
            } else {
                this.setState({sortDesc: true, sortName: element.val})
            }

            let toSort = this.state.filteredData;
            toSort.sort((a, b) => {
                /* Remove comma in strings */
                if (typeof a[element.val] === 'string') a[element.val] = a[element.val].replace(/,/g, '');
                if (typeof b[element.val] === 'string') b[element.val] = b[element.val].replace(/,/g, '');
                return this.state.sortDesc ?
                    parseInt(b[element.val]) - parseInt(a[element.val]) :
                    parseInt(a[element.val]) - parseInt(b[element.val])
            });
            this.setState({filteredData: toSort})
        }
    };

    csvData = (dataFormat) => {
        return [
            dataFormat.map(el => el.val),
            ...this.state.filteredData.map(el => {
                let arr = [];
                dataFormat.forEach(x => arr.push(el[x.val]))
                return arr
            })
        ]
    };

    render() {
        // TODO: pagination, popovers for table head
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

        function sortHead(el, sortName) { // <-- render sorting thingy
            return el.sort && sortName === el.val ? <i>&#9662;</i> : null
        }

        function makeHead(filterHandler, sortHandler, sortName) { // <-- generate table head
            return dataFormat.map(
                (el, idx) =>
                    <th key={idx} className={el.sort ? 'pointer' : ''} onClick={() => sortHandler(el)}>
                        {el.display}
                        {el.val === 'Player' ?
                            <input style={inputStyle} placeholder="Type to filter..." className="ml-3 form-control"
                                   onChange={filterHandler}/> : null}
                        {sortHead(el, sortName)}
                    </th>
            )
        }

        function makeBody(player) {
            return dataFormat.map((el, idx) => <td key={idx}>{player[el.val]}</td>)
        }

        return (
            <section className="container-fluid">
                <div className="text-left py-4">
                    <CSVLink data={this.csvData(dataFormat)}
                             filename={"rushing.csv"}
                             className="btn btn-primary"
                             target="_blank">
                        Export CSV
                    </CSVLink>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {makeHead(this.filterHandler, this.sortHandler, this.state.sortName)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.filteredData.map((player, idx) => <tr key={idx}>{makeBody(player)}</tr>)}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default PlayersGrid;
