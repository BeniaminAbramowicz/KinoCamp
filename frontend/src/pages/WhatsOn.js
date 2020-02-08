// import React, {Component} from 'react';

// class WhatsOn extends Component {
//     render() {
//         return(
//             <div>
//                 <p>There will be a movie list</p>
//             </div>
//         )
//     }
// }

// export default WhatsOn;

import React, {Component} from 'react';
import {useTable} from 'react-table';
import api from '../api';

import styled from 'styled-components';
// import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
}

class WhatsOn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }
    
    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

        const columns = [
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Genre',
                accessor: 'genre',
                filterable: true,
            },
            {
                Header: 'Running time',
                accessor: 'runningTime',
                filterable: true,
            },
            {
                Header: 'Director',
                accessor: 'director',
                filterable: true,
            },
            {
                Header: 'Age restriction',
                accessor: 'agerestriction',
                filterable: true,
            },
            // {
            //     Header: 'Time',
            //     accessor: 'time',
            //     Cell: props => <span>{props.value.join(' / ')}</span>,
            // },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <Table
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default WhatsOn;

