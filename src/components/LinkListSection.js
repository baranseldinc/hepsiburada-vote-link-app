import React, { Component } from 'react';
import MyModal from "./MyModal";
import { Link } from 'react-router-dom'

export default class LinkListSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkList: [],
            pageSize: 5,
            current: 1
        }
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        const data = localStorage.getItem('linkList');
        var linkList = data ? JSON.parse(data) : [];
        linkList = linkList.sort((a, b) => a.insertTime < b.insertTime ? 1 : -1);
        this.setState({ linkList });
    }

    handleClickUpVote(item) {
        item.point++;
        item.lastVoteTime = new Date();
        item.totalVote++;
        this.handleList();
        localStorage.setItem('linkList', JSON.stringify(this.state.linkList));
    }

    handleClickDownVote(item) {
        item.point--;
        item.lastVoteTime = new Date();
        item.totalVote++;
        this.handleList();
        localStorage.setItem('linkList', JSON.stringify(this.state.linkList));
    }

    handleList = () => {
        var listOrderedByTotalVote = this.state.linkList.sort((a, b) => {
            if (a.point === b.point) {
                if (a.lastVoteTime < b.lastVoteTime) return -1;
                else return 1;
            } else {
                if (a.point > b.point) return -1;
                else return 1;
            }
        });
        this.setState({ linkList: listOrderedByTotalVote });
    }

    handleClickDeleteConfirmation(item) {
        this.modalRef.current.showModal({
            title: 'Confirm Delete?',
            body: 'Are you sure delete ' + item.name,
            handler: () => this.handleClickDelete(item)
        })
    }

    handleClickDelete(item) {
        const { linkList } = this.state;
        const index = linkList.findIndex(_item => item.key === _item.key);
        if (index > -1) {
            this.state.linkList.splice(index, 1);
            this.setState({ linkList });
            localStorage.setItem('linkList', JSON.stringify(linkList));
            window.toastr.success(item.name + ' was deleted.');
        }
    }

    handleChangeOrder = (e) => {
        this.setState({ orderBy: e.target.value });
        var { linkList } = this.state;

        if (e.target.value === 'mostVoted') { //order by most voted
            linkList = linkList.sort((a, b) => a.totalVote < b.totalVote ? 1 : -1);
            this.setState(linkList);
        } else if (e.target.value === 'lessVoted') {    //order by less voted
            linkList = linkList.sort((a, b) => a.totalVote > b.totalVote ? 1 : -1);
            this.setState(linkList);
        }
    }

    handleClickBack = () => {
        var { current } = this.state;
        if (current > 1) {
            this.setState({ current: --current });
        }
    }

    handleClickForward = () => {
        var { current, pageSize } = this.state;
        var pageCount = Math.ceil(this.state.linkList.length / pageSize);
        if (current < pageCount) {
            this.setState({ current: ++current });
        }
    }

    handleClickPage = (num) => {
        this.setState({ current: num });
    }

    getFormattedDateTime = (_date) => {
        var date = new Date(_date);
        var datetime = (date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + date.getFullYear() + ' '
            + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
            + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
            + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return datetime;
    }

    render() {
        const { current, pageSize } = this.state;
        var pageCount = Math.ceil(this.state.linkList.length / pageSize);
        var start = (current - 1) * pageSize;
        var limit = start + pageSize;
        limit = this.state.linkList.length < limit ? this.state.linkList.length : limit;
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div id="divSubmitLink" className="text-center" >
                    <Link to="/new">
                        <button className="btn btn-primary float-right">
                            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            <span style={{ marginLeft: '6px' }}>SUBMIT A LINK</span>
                        </button>
                    </Link>
                </div>
                <div id="divLinkListSection" className="mt-2">
                    <select className="form-select" aria-label="Default select example" onChange={this.handleChangeOrder}>
                        <option selected disabled>Order By</option>
                        <option value="mostVoted">Most Voted (Z -&gt; A)</option>
                        <option value="lessVoted">Less Voted (A -&gt; Z)</option>
                    </select>

                    <div id="divLinkList">
                        {(() => {
                            const items = [];
                            for (var i = start; i < limit; i++) {
                                const item = this.state.linkList[i];
                                items.push(
                                    <div key={item.key} className="linkContainer mt-2">
                                        <i className="fa fa-minus-circle linkDeleteButton shadow-sm" aria-hidden="true" onClick={() => this.handleClickDeleteConfirmation(item)}></i>
                                        <div className="card pointDisplay text-center shadow-sm" style={{ display: 'inline-block' }}>
                                            <div className="card-body"><h3>{item.point}</h3><span>POINTS</span></div>
                                        </div>
                                        <div className="linkInfo" style={{ display: 'inline-block', paddingLeft: '20px' }}>
                                            <span className="text-muted totalVote">TotalVote: {item.totalVote}</span>
                                            <span className="text-muted lastVote">LastVote: {this.getFormattedDateTime(item.lastVoteTime)}</span>
                                            <h5 className="mb-0">{item.name}</h5>
                                            <small className="text-muted font-xs">({item.url})</small>
                                            <div className="mt-1">
                                                <button className="btn btn-outline-success" onClick={() => this.handleClickUpVote(item)}><i className="fa fa-arrow-up" aria-hidden="true"></i> Up Vote</button>
                                                <button className="btn btn-outline-danger pl-4" style={{ display: 'inline-block', marginLeft: '36px' }} onClick={() => this.handleClickDownVote(item)}><i className="fa fa-arrow-down" aria-hidden="true"></i> Down Vote</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return items;
                        })()}

                    </div>
                </div>
                <MyModal ref={this.modalRef} />
                {pageCount > 1 &&
                    <div id="divPaginationSection" className="text-center mt-4">
                        <span className="paginationItem" onClick={this.handleClickBack}><i className="fa fa-arrow-left" aria-hidden="true"></i></span>

                        {(() => {
                            var pages = [];
                            for (let j = 1; j <= pageCount; j++) {
                                let clsName = "paginationItem";
                                if (current === j)
                                    clsName += " activePage"
                                pages.push(<span className={clsName} onClick={() => this.handleClickPage(j)}>{j}</span>);
                            }
                            return pages;
                        })()}
                        <span className="paginationItem" onClick={this.handleClickForward}><i className="fa fa-arrow-right" aria-hidden="true"></i></span>
                    </div>
                }
            </div>
        )
    }
}
