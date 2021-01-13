
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: ''
        }
    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleChangeURL = (e) => {
        this.setState({ url: e.target.value })
    }

    handleClickAdd = (e) => {
        e.preventDefault();
        if (this.state.name && this.state.url) {
            const data = localStorage.getItem('linkList');
            var linkList = data ? JSON.parse(data) : [];
            if (!linkList) {    //if linkList is not defined
                linkList = [];
            }
            const key = this.state.name + Math.random().toString();
            linkList.push({
                key: key,
                name: this.state.name,
                url: this.state.url,
                point: 0,
                insertTime: new Date(),
                lastVoteTime: null,
                totalVote: 0
            })
            localStorage.setItem('linkList', JSON.stringify(linkList));
            window.toastr.success(this.state.name + ' was added.');
            this.setState({ name: '', url: '' });
        } else {
            window.toastr.info('Do not keep any empty fields!');
        }
    }

    handleFocusUrl = (e) => {
        if (this.state.name) {
            this.setState({ url: 'https://www.' + this.state.name.toLowerCase() + '.com' });
        } else {
            if (!this.state.url) {
                this.setState({ url: 'https://' });
            }
        }
    }

    handleBlurUrl = (e) => {
        if (this.state.url === 'https://') {
            this.setState({ url: '' });
        }
    }

    render() {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div>
                    <Link to="/">
                        <span id="idReturnToList"><i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Return to List</span>
                    </Link>
                </div>
                <div className="card mt-2">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Link Name:</label>
                                <input type="text" className="form-control" placeholder="e.g. HepsiBurada" value={this.state.name} onChange={this.handleChangeName} />

                            </div>
                            <div className="form-group mt-4">
                                <label>Link URL:</label>
                                <input type="text" className="form-control" placeholder="e.g. https://www.hepsiburada.com/" onBlur={this.handleBlurUrl}
                                    onFocus={this.handleFocusUrl} value={this.state.url} onChange={this.handleChangeURL} />
                            </div>

                            <button type="submit" className="btn btn-success mt-4" onClick={this.handleClickAdd}>ADD</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
